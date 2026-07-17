import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import slugify from "slugify";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const brand = searchParams.get("brand");
    const sort = searchParams.get("sort") || "newest";

    const where: Record<string, unknown> = { isActive: true };

    if (brand) {
      where.brand = brand;
    }

    if (category) {
      where.category = { slug: category };
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (featured === "true") {
      where.isFeatured = true;
    }

    let orderBy: Record<string, string> = { createdAt: "desc" };
    if (sort === "price_asc") orderBy = { price: "asc" };
    else if (sort === "price_desc") orderBy = { price: "desc" };
    else if (sort === "name") orderBy = { name: "asc" };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: { orderBy: { position: "asc" }, take: 2 },
          category: { select: { id: true, name: true, slug: true } },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Products GET error:", error instanceof Error ? error.message : error, error instanceof Error ? error.stack : "");
    return NextResponse.json({ error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, price, compareAtPrice, sku, stock, weight, weightUnit, categoryId, images, isFeatured, gstRate, brand } = body;

    if (!name || !price) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const existingSlug = await prisma.product.findUnique({ where: { slug } });
    const finalSlug = existingSlug ? `${slug}-${Date.now().toString(36)}` : slug;

    const product = await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        description,
        price,
        compareAtPrice,
        sku: sku || null,
        stock: stock || 0,
        weight,
        weightUnit: weightUnit || "grams",
        categoryId,
        isFeatured: isFeatured || false,
        gstRate: gstRate || 12,
        brand: brand || "GRABWAY_NATURALS",
        images: images?.length
          ? {
              create: images.map((img: { url: string; altText?: string }, i: number) => ({
                url: img.url,
                altText: img.altText || name,
                position: i,
              })),
            }
          : undefined,
      },
      include: {
        images: true,
        category: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Products POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
