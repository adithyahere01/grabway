import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const showcases = await prisma.productShowcase.findMany({
      where: { isActive: true },
      orderBy: { position: "asc" },
    });

    return NextResponse.json(showcases);
  } catch (error) {
    console.error("Showcases GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, image, content, position, isActive } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const showcase = await prisma.productShowcase.create({
      data: {
        title,
        image: image || "",
        content,
        position: position ?? 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(showcase, { status: 201 });
  } catch (error) {
    console.error("Showcases POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
