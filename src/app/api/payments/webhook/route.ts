import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { fulfillOrder, sendOrderEmails } from "@/lib/order-fulfillment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    switch (event.event) {
      case "payment.captured": {
        const paymentEntity = event.payload.payment.entity;
        await prisma.payment.updateMany({
          where: { razorpayOrderId: paymentEntity.order_id },
          data: {
            razorpayPaymentId: paymentEntity.id,
            method: paymentEntity.method,
            status: "COMPLETED",
          },
        });

        const payment = await prisma.payment.findFirst({
          where: { razorpayOrderId: paymentEntity.order_id },
        });
        if (payment) {
          const fulfilled = await fulfillOrder(payment.orderId);
          if (fulfilled) {
            await sendOrderEmails(payment.orderId);
          }
        }
        break;
      }

      case "payment.failed": {
        const paymentEntity = event.payload.payment.entity;
        await prisma.payment.updateMany({
          where: { razorpayOrderId: paymentEntity.order_id },
          data: { status: "FAILED" },
        });
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
