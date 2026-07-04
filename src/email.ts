import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || "GrabWay <onboarding@resend.dev>";

interface OrderEmailData {
  orderNumber: string;
  total: number;
  items: { productName: string; quantity: number; price: number }[];
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    postalCode: string;
  };
  customerName: string;
  customerEmail: string;
}

function formatItemsTable(items: OrderEmailData["items"]): string {
  return items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.productName}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${(Number(item.price) * item.quantity).toFixed(0)}</td>
        </tr>`
    )
    .join("");
}

function formatAddress(addr: OrderEmailData["shippingAddress"]): string {
  const lines = [addr.addressLine1];
  if (addr.addressLine2) lines.push(addr.addressLine2);
  lines.push(`${addr.city}, ${addr.state} - ${addr.postalCode}`);
  return lines.join("<br/>");
}

export async function sendOwnerOrderNotification(order: OrderEmailData) {
  const ownerEmail = process.env.OWNER_EMAIL;
  if (!ownerEmail) return;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ownerEmail,
    subject: `New Order #${order.orderNumber} - ${order.customerName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 50px; height: 50px; background: #F59E0B; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
            <span style="color: white; font-weight: bold; font-size: 24px;">G</span>
          </div>
          <h1 style="color: #1a1a1a; margin-top: 15px;">New Order Received!</h1>
        </div>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <p style="margin: 0; font-weight: 600; color: #166534;">Order #${order.orderNumber} — ₹${Number(order.total).toFixed(0)}</p>
          <p style="margin: 4px 0 0; font-size: 14px; color: #15803d;">Payment confirmed. Ready to pack!</p>
        </div>
        <h3 style="color: #1a1a1a; margin-bottom: 8px;">Items</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr style="background: #f9fafb;">
              <th style="padding: 8px; text-align: left;">Product</th>
              <th style="padding: 8px; text-align: center;">Qty</th>
              <th style="padding: 8px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>${formatItemsTable(order.items)}</tbody>
        </table>
        <h3 style="color: #1a1a1a; margin: 20px 0 8px;">Ship To</h3>
        <div style="background: #f9fafb; border-radius: 8px; padding: 12px; font-size: 14px;">
          <p style="margin: 0; font-weight: 600;">${order.shippingAddress.fullName}</p>
          <p style="margin: 4px 0; color: #4a4a4a;">${formatAddress(order.shippingAddress)}</p>
          <p style="margin: 4px 0; color: #4a4a4a;">Phone: ${order.shippingAddress.phone}</p>
        </div>
        <h3 style="color: #1a1a1a; margin: 20px 0 8px;">Customer</h3>
        <p style="font-size: 14px; color: #4a4a4a; margin: 0;">${order.customerName} — ${order.customerEmail}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="color: #999; font-size: 12px; text-align: center;">
          GrabWay - Pure Honey & Home Essentials
        </p>
      </div>
    `,
  });
}

export async function sendCustomerOrderConfirmation(order: OrderEmailData) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: order.customerEmail,
    subject: `Order Confirmed - #${order.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 50px; height: 50px; background: #F59E0B; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
            <span style="color: white; font-weight: bold; font-size: 24px;">G</span>
          </div>
          <h1 style="color: #1a1a1a; margin-top: 15px;">Order Confirmed!</h1>
        </div>
        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
          Hi ${order.customerName}, your order has been confirmed and is being prepared for shipment.
        </p>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0; font-weight: 600; color: #166534;">Order #${order.orderNumber}</p>
          <p style="margin: 4px 0 0; font-size: 14px; color: #15803d;">Total: ₹${Number(order.total).toFixed(0)}</p>
        </div>
        <h3 style="color: #1a1a1a; margin-bottom: 8px;">Your Items</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr style="background: #f9fafb;">
              <th style="padding: 8px; text-align: left;">Product</th>
              <th style="padding: 8px; text-align: center;">Qty</th>
              <th style="padding: 8px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>${formatItemsTable(order.items)}</tbody>
        </table>
        <h3 style="color: #1a1a1a; margin: 20px 0 8px;">Delivering To</h3>
        <div style="background: #f9fafb; border-radius: 8px; padding: 12px; font-size: 14px;">
          <p style="margin: 0; font-weight: 600;">${order.shippingAddress.fullName}</p>
          <p style="margin: 4px 0; color: #4a4a4a;">${formatAddress(order.shippingAddress)}</p>
        </div>
        <p style="color: #6a6a6a; font-size: 14px; line-height: 1.5; margin-top: 20px;">
          We'll notify you when your order is shipped. Thank you for shopping with GrabWay!
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="color: #999; font-size: 12px; text-align: center;">
          GrabWay - Pure Honey & Home Essentials
        </p>
      </div>
    `,
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const verifyLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Verify your GrabWay account",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 50px; height: 50px; background: #F59E0B; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
            <span style="color: white; font-weight: bold; font-size: 24px;">G</span>
          </div>
          <h1 style="color: #1a1a1a; margin-top: 15px;">Verify Your Email</h1>
        </div>
        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
          Thanks for signing up for GrabWay! Please verify your email address by clicking the button below:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyLink}" style="background: #F59E0B; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p style="color: #6a6a6a; font-size: 14px; line-height: 1.5;">
          This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="color: #999; font-size: 12px; text-align: center;">
          GrabWay - Pure Honey & Home Essentials
        </p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Reset your GrabWay password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 50px; height: 50px; background: #F59E0B; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
            <span style="color: white; font-weight: bold; font-size: 24px;">G</span>
          </div>
          <h1 style="color: #1a1a1a; margin-top: 15px;">Reset Your Password</h1>
        </div>
        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
          You requested a password reset for your GrabWay account. Click the button below to set a new password:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background: #F59E0B; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p style="color: #6a6a6a; font-size: 14px; line-height: 1.5;">
          This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="color: #999; font-size: 12px; text-align: center;">
          GrabWay - Pure Honey & Home Essentials
        </p>
      </div>
    `,
  });
}
