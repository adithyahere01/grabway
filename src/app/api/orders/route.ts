import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { generateOrderNumber, getShippingCharge } from "@/lib/utils";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: { product: { include: { images: { take: 1 } } } },
        },
        payment: true,
        shippingAddress: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Orders GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { shippingAddressId, couponCode, notes } = await req.json();

    if (!shippingAddressId) {
      return NextResponse.json({ error: "Shipping address is required" }, { status: 400 });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: session.user.id },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Verify stock availability
    for (const item of cartItems) {
      if (item.product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${item.product.name}` },
          { status: 400 }
        );
      }
    }

    // Calculate totals
    let subtotal = 0;
    let totalTax = 0;
    const orderItems = cartItems.map((item) => {
      const itemTotal = Number(item.product.price) * item.quantity;
      const itemTax = (itemTotal * Number(item.product.gstRate)) / 100;
      subtotal += itemTotal;
      totalTax += itemTax;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
        productName: item.product.name,
      };
    });

    const shippingCharge = getShippingCharge(subtotal);

    // Apply coupon
    let discount = 0;
    let couponId: string | undefined;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase() },
      });
      if (coupon && coupon.isActive && new Date() >= coupon.validFrom && new Date() <= coupon.validTo) {
        if (!coupon.usageLimit || coupon.usedCount < coupon.usageLimit) {
          if (!coupon.minOrderAmount || subtotal >= Number(coupon.minOrderAmount)) {
            if (coupon.discountType === "PERCENTAGE") {
              discount = (subtotal * Number(coupon.discountValue)) / 100;
              if (coupon.maxDiscount) {
                discount = Math.min(discount, Number(coupon.maxDiscount));
              }
            } else {
              discount = Number(coupon.discountValue);
            }
            couponId = coupon.id;
          }
        }
      }
    }

    const total = subtotal + totalTax + shippingCharge - discount;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: session.user.id!,
        subtotal,
        tax: Math.round(totalTax * 100) / 100,
        shippingCharge,
        discount: Math.round(discount * 100) / 100,
        total: Math.round(total * 100) / 100,
        couponId,
        shippingAddressId,
        notes,
        items: { create: orderItems },
        payment: {
          create: { amount: Math.round(total * 100) / 100, status: "PENDING" },
        },
      },
      include: {
        items: true,
        payment: true,
        shippingAddress: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Orders POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
