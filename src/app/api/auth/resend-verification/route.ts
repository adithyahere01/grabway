import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { message: "If an account exists, a verification email has been sent." },
        { status: 200 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Email is already verified" },
        { status: 400 }
      );
    }

    const existingToken = await prisma.verificationToken.findFirst({
      where: { identifier: normalizedEmail },
    });

    if (existingToken) {
      const tokenAge = Date.now() - (existingToken.expires.getTime() - 24 * 60 * 60 * 1000);
      if (tokenAge < 60 * 1000) {
        return NextResponse.json(
          { error: "Please wait at least 1 minute before requesting a new email" },
          { status: 429 }
        );
      }

      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: existingToken.identifier,
            token: existingToken.token,
          },
        },
      });
    }

    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: {
        identifier: normalizedEmail,
        token,
        expires,
      },
    });

    await sendVerificationEmail(normalizedEmail, token);

    return NextResponse.json(
      { message: "Verification email sent. Please check your inbox." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
