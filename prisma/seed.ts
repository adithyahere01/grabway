import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@grabway.in" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@grabway.in",
      passwordHash: adminPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });
  console.log("✓ Admin user created:", admin.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "raw-honey" },
      update: {},
      create: { name: "Raw Honey", slug: "raw-honey", description: "Pure, unprocessed honey straight from the hive", brand: "GRABWAY_NATURALS" },
    }),
    prisma.category.upsert({
      where: { slug: "flavored-honey" },
      update: {},
      create: { name: "Flavored Honey", slug: "flavored-honey", description: "Honey infused with natural flavors", brand: "GRABWAY_NATURALS" },
    }),
    prisma.category.upsert({
      where: { slug: "honey-combos" },
      update: {},
      create: { name: "Honey Combos", slug: "honey-combos", description: "Gift sets and combo packs", brand: "GRABWAY_NATURALS" },
    }),
    prisma.category.upsert({
      where: { slug: "beeswax-products" },
      update: {},
      create: { name: "Beeswax Products", slug: "beeswax-products", description: "Natural beeswax candles and skincare", brand: "GRABWAY_NATURALS" },
    }),
    prisma.category.upsert({
      where: { slug: "home-essentials" },
      update: {},
      create: { name: "Home Essentials", slug: "home-essentials", description: "Everyday home products", brand: "GRABWAY_ESSENTIALS" },
    }),
    prisma.category.upsert({
      where: { slug: "kitchen-items" },
      update: {},
      create: { name: "Kitchen Items", slug: "kitchen-items", description: "Jars, containers, and kitchen storage", brand: "GRABWAY_ESSENTIALS" },
    }),
  ]);
  console.log("✓ Categories created:", categories.length);

  // Create products
  const products = [
    { name: "Wild Forest Honey - 500g", price: 449, compareAtPrice: 599, stock: 50, categorySlug: "raw-honey", description: "Pure wild forest honey harvested from the dense forests of the Western Ghats. Rich in antioxidants and natural enzymes. Dark amber color with a robust, complex flavor." },
    { name: "Multiflora Raw Honey - 500g", price: 349, compareAtPrice: 499, stock: 100, categorySlug: "raw-honey", description: "Collected from multiple flower sources, this raw honey offers a balanced sweet taste with subtle floral notes. Unpasteurized and unfiltered." },
    { name: "Himalayan Cliff Honey - 250g", price: 699, compareAtPrice: 899, stock: 25, categorySlug: "raw-honey", description: "Rare honey harvested from high-altitude Himalayan cliffs. Known for its medicinal properties and unique taste." },
    { name: "Tulsi Infused Honey - 350g", price: 399, compareAtPrice: 549, stock: 75, categorySlug: "flavored-honey", description: "Pure honey infused with organic tulsi (holy basil). Perfect for building immunity and soothing sore throats." },
    { name: "Cinnamon Honey - 350g", price: 379, compareAtPrice: 499, stock: 60, categorySlug: "flavored-honey", description: "Raw honey blended with Ceylon cinnamon. Great for metabolism boost and as a natural sweetener in tea." },
    { name: "Ginger Honey - 350g", price: 389, compareAtPrice: 520, stock: 45, categorySlug: "flavored-honey", description: "Warming ginger-infused honey perfect for cold weather. Helps with digestion and cold relief." },
    { name: "Honey Gift Set - Pack of 3", price: 999, compareAtPrice: 1299, stock: 30, categorySlug: "honey-combos", description: "Beautiful gift box with 3 varieties of premium honey (Wild Forest, Multiflora, and Tulsi). Perfect for Diwali and festive gifting." },
    { name: "Honey Tasting Collection - 5 Pack", price: 1499, compareAtPrice: 1899, stock: 20, categorySlug: "honey-combos", description: "Explore 5 unique flavors in mini jars. Includes Wild Forest, Multiflora, Tulsi, Cinnamon, and Himalayan honey." },
    { name: "Natural Beeswax Candle - Set of 3", price: 299, compareAtPrice: 399, stock: 40, categorySlug: "beeswax-products", description: "Hand-poured beeswax candles with natural honey scent. Long burning time, non-toxic, and eco-friendly." },
    { name: "Beeswax Lip Balm - Honey & Vanilla", price: 149, compareAtPrice: 199, stock: 100, categorySlug: "beeswax-products", description: "All-natural lip balm made with beeswax and coconut oil. Moisturizes and protects dry lips." },
    { name: "Glass Honey Jar with Wooden Dipper - 500ml", price: 199, compareAtPrice: 249, stock: 80, categorySlug: "kitchen-items", description: "Elegant glass jar perfect for storing and serving honey. Comes with a traditional wooden honey dipper." },
    { name: "Bamboo Kitchen Storage Set - 3 Pieces", price: 799, compareAtPrice: 999, stock: 35, categorySlug: "home-essentials", description: "Sustainable bamboo containers for tea, coffee, and sugar. Airtight lids to keep contents fresh." },
  ];

  const essentialsCategorySlugs = ["home-essentials", "kitchen-items"];

  for (const p of products) {
    const category = categories.find((c) => c.slug === p.categorySlug);
    const brand = essentialsCategorySlugs.includes(p.categorySlug) ? "GRABWAY_ESSENTIALS" : "GRABWAY_NATURALS";
    await prisma.product.upsert({
      where: { slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "") },
      update: {},
      create: {
        name: p.name,
        slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""),
        description: p.description,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        stock: p.stock,
        categoryId: category?.id,
        brand,
        isActive: true,
        isFeatured: ["Wild Forest Honey - 500g", "Multiflora Raw Honey - 500g", "Honey Gift Set - Pack of 3", "Tulsi Infused Honey - 350g"].includes(p.name),
        gstRate: 5,
      },
    });
  }
  console.log("✓ Products created:", products.length);

  // Create a welcome coupon
  await prisma.coupon.upsert({
    where: { code: "WELCOME10" },
    update: {},
    create: {
      code: "WELCOME10",
      discountType: "PERCENTAGE",
      discountValue: 10,
      maxDiscount: 100,
      minOrderAmount: 300,
      usageLimit: 1000,
      validFrom: new Date(),
      validTo: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  });
  console.log("✓ Welcome coupon created: WELCOME10");

  console.log("\n🎉 Database seeded successfully!");
  console.log("   Admin login: admin@grabway.in / admin123");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
