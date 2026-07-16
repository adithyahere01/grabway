import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import mysql from "mysql2/promise";

export async function GET() {
  const diagnostics: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URL_SET: !!process.env.DATABASE_URL,
      DATABASE_URL_HOST: process.env.DATABASE_URL
        ? (() => { try { return new URL(process.env.DATABASE_URL).hostname; } catch { return "PARSE_ERROR"; } })()
        : "NOT_SET",
      AUTH_SECRET_SET: !!process.env.AUTH_SECRET,
      NODE_ENV: process.env.NODE_ENV,
    },
  };

  // Test 1: Raw mysql2 connection
  try {
    const url = new URL(process.env.DATABASE_URL!);
    const connection = await mysql.createConnection({
      host: url.hostname,
      port: parseInt(url.port || "3306", 10),
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: url.pathname.slice(1),
      connectTimeout: 10000,
    });
    const [rows] = await connection.execute("SELECT 1 as connected");
    await connection.end();
    diagnostics.mysql2_direct = { status: "CONNECTED", result: rows };
  } catch (error) {
    diagnostics.mysql2_direct = {
      status: "FAILED",
      error: error instanceof Error ? error.message : String(error),
    };
  }

  // Test 2: Prisma adapter connection
  try {
    const result = await prisma.$queryRawUnsafe("SELECT 1 as connected");
    diagnostics.prisma_adapter = { status: "CONNECTED", result };
  } catch (error) {
    diagnostics.prisma_adapter = {
      status: "FAILED",
      error: error instanceof Error ? error.message : String(error),
    };
  }

  return NextResponse.json(diagnostics);
}
