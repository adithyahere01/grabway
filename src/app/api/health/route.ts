import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const diagnostics: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URL_SET: !!process.env.DATABASE_URL,
      DATABASE_URL_HOST: process.env.DATABASE_URL
        ? (() => { try { return new URL(process.env.DATABASE_URL).hostname; } catch { return "PARSE_ERROR"; } })()
        : "NOT_SET",
      DATABASE_SOCKET: process.env.DATABASE_SOCKET || "NOT_SET",
      AUTH_SECRET_SET: !!process.env.AUTH_SECRET,
      NODE_ENV: process.env.NODE_ENV,
    },
  };

  try {
    const result = await prisma.$queryRawUnsafe("SELECT 1 as connected");
    diagnostics.database = { status: "CONNECTED", result };
  } catch (error) {
    diagnostics.database = {
      status: "FAILED",
      error: error instanceof Error ? error.message : String(error),
    };
  }

  return NextResponse.json(diagnostics);
}
