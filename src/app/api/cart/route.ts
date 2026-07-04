import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await prisma.cartItem.findMany({
      where: { userId: session.user.id },
      include: {
        product: {
          include: { images: { take: 1, orderBy: { position: "asc" } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity = 1 } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product || !product.isActive) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.stock < quantity) {
      return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
    }

    const existing = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId: session.user.id!, productId } },
    });

    let cartItem;
    if (existing) {
      cartItem = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: Math.min(existing.quantity + quantity, product.stock) },
        include: { product: { include: { images: { take: 1 } } } },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: { userId: session.user.id!, productId, quantity },
        include: { product: { include: { images: { take: 1 } } } },
      });
    }

    return NextResponse.json(cartItem);
  } catch (error) {
    console.error("Cart POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity } = await req.json();

    if (quantity <= 0) {
      await prisma.cartItem.deleteMany({
        where: { userId: session.user.id!, productId },
      });
      return NextResponse.json({ message: "Item removed" });
    }

    const cartItem = await prisma.cartItem.update({
      where: { userId_productId: { userId: session.user.id!, productId } },
      data: { quantity },
      include: { product: { include: { images: { take: 1 } } } },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    console.error("Cart PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();

    await prisma.cartItem.deleteMany({
      where: { userId: session.user.id!, productId },
    });

    return NextResponse.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Cart DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
