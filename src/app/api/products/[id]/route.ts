import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
        isActive: true,
      },
      include: {
        images: { orderBy: { position: "asc" } },
        category: { select: { id: true, name: true, slug: true } },
        reviews: {
          include: { user: { select: { name: true, image: true } } },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Product GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        compareAtPrice: body.compareAtPrice,
        sku: body.sku || null,
        stock: body.stock,
        weight: body.weight,
        weightUnit: body.weightUnit || "grams",
        categoryId: body.categoryId,
        isActive: body.isActive,
        isFeatured: body.isFeatured,
        gstRate: body.gstRate,
      },
      include: { images: true, category: true },
    });

    if (body.images && Array.isArray(body.images)) {
      await prisma.productImage.deleteMany({ where: { productId: id } });

      if (body.images.length > 0) {
        await prisma.productImage.createMany({
          data: body.images.map((img: { url: string }, index: number) => ({
            productId: id,
            url: img.url,
            position: index,
          })),
        });
      }
    }

    const updated = await prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { position: "asc" } }, category: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Product PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const hasOrders = await prisma.orderItem.count({ where: { productId: id } });

    if (hasOrders > 0) {
      await prisma.product.update({
        where: { id },
        data: { isActive: false },
      });
      return NextResponse.json({ message: "Product deactivated (has order history)" });
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Product DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
