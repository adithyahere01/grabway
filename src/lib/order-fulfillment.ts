import { prisma } from "@/lib/prisma";
import { sendOwnerOrderNotification, sendCustomerOrderConfirmation } from "@/lib/email";

/**
 * Atomically fulfills an order: decrements stock, increments coupon usage, clears cart.
 * Uses an optimistic lock on order status to prevent double-fulfillment when both
 * the verify endpoint and webhook fire concurrently.
 *
 * Returns true if fulfillment was performed, false if already fulfilled.
 */
export async function fulfillOrder(orderId: string): Promise<boolean> {
  const updated = await prisma.order.updateMany({
    where: { id: orderId, status: "PENDING" },
    data: { status: "PROCESSING" },
  });

  if (updated.count === 0) {
    return false;
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) return false;

  for (const item of order.items) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } },
    });
  }

  if (order.couponId) {
    await prisma.coupon.update({
      where: { id: order.couponId },
      data: { usedCount: { increment: 1 } },
    });
  }

  await prisma.cartItem.deleteMany({ where: { userId: order.userId } });

  return true;
}

export async function sendOrderEmails(orderId: string): Promise<void> {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        shippingAddress: true,
        user: { select: { name: true, email: true } },
      },
    });

    if (!order || !order.shippingAddress) return;

    const emailData = {
      orderNumber: order.orderNumber,
      total: Number(order.total),
      items: order.items.map((i) => ({
        productName: i.productName,
        quantity: i.quantity,
        price: Number(i.price),
      })),
      shippingAddress: order.shippingAddress,
      customerName: order.user.name || order.shippingAddress.fullName,
      customerEmail: order.user.email,
    };

    await Promise.all([
      sendOwnerOrderNotification(emailData),
      sendCustomerOrderConfirmation(emailData),
    ]);
  } catch (error) {
    console.error("Failed to send order emails:", error);
  }
}
