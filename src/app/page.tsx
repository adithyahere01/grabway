import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "Raw Honey", slug: "raw-honey", icon: "🍯", description: "Unprocessed pure honey" },
  { name: "Flavored Honey", slug: "flavored-honey", icon: "🌸", description: "Infused with natural flavors" },
  { name: "Honey Combos", slug: "honey-combos", icon: "🎁", description: "Gift sets & bundles" },
  { name: "Beeswax Products", slug: "beeswax-products", icon: "🕯️", description: "Candles & skincare" },
  { name: "Home Essentials", slug: "home-essentials", icon: "🏠", description: "Daily home needs" },
  { name: "Kitchen Items", slug: "kitchen-items", icon: "🍳", description: "Jars, containers & more" },
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    comment: "The raw honey is absolutely pure and tastes amazing. I've been ordering for 6 months now and the quality is consistent every time.",
  },
  {
    name: "Rajesh Kumar",
    location: "Mumbai",
    rating: 5,
    comment: "Best honey I've ever tasted. You can tell it's genuine. The delivery was fast and packaging was excellent.",
  },
  {
    name: "Anita Patel",
    location: "Bangalore",
    rating: 5,
    comment: "Love the variety of products. The honey gift set was perfect for Diwali gifting. Will definitely order again!",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Brand Navigation */}
      <section className="bg-gradient-to-b from-cream-50 to-white py-12">
        <div className="container">
          <div className="flex justify-center items-center gap-8 md:gap-16">
            <Link
              href="/naturals"
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white border-2 border-honey-300 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all overflow-hidden p-3">
                <img src="/logos/grabway-naturals.png" alt="Grabway Naturals" className="w-full h-full object-contain" />
              </div>
              <span className="text-sm md:text-base font-semibold text-forest-900 group-hover:text-honey-700 transition-colors">
                Grabway Naturals
              </span>
            </Link>
            <Link
              href="/essentials"
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white border-2 border-emerald-300 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all overflow-hidden p-3">
                <img src="/logos/grabway-essentials.png" alt="Grabway Essentials" className="w-full h-full object-contain" />
              </div>
              <span className="text-sm md:text-base font-semibold text-forest-900 group-hover:text-emerald-700 transition-colors">
                Grabway Essentials
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-honey-50 via-cream-50 to-forest-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-honey-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-forest-300 rounded-full blur-3xl" />
        </div>
        <div className="container relative py-16 md:py-24 lg:py-32">
          <div className="max-w-2xl">
            <Badge variant="warning" className="mb-4">
              100% Natural & Pure
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest-900 leading-tight">
              Nature&apos;s Sweetest{" "}
              <span className="text-honey-600">Gift</span>
              <br />
              Delivered Fresh
            </h1>
            <p className="mt-6 text-lg text-forest-700 max-w-lg">
              Discover our collection of pure, raw honey sourced directly from
              Indian beekeepers, along with premium home essentials for everyday
              living.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Shop Now
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link href="/products?category=honey-combos">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Gift Sets
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-forest-600">
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-forest-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free delivery above ₹500
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-forest-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                COD Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-forest-900">Shop by Category</h2>
          <p className="mt-2 text-muted-foreground">
            Browse our curated collections of honey and home essentials
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group p-6 rounded-xl border border-border bg-white hover:border-honey-300 hover:shadow-md transition-all text-center"
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="font-semibold text-sm text-forest-900 group-hover:text-honey-700 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Product Highlights */}
      <section className="container py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-100 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1643370050942-67e8b98a3f27?w=200&h=200&fit=crop&crop=center"
                alt="Multi Flower Honey"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-forest-900 italic mb-2">Multi Flower Honey</h3>
              <p className="text-sm text-forest-600 leading-relaxed">
                Multifloral Honey is a golden blend crafted from the nectar of many blossoms, offering a rich taste, natural sweetness, and floral aroma in every drop.
              </p>
            </div>
          </div>

          <div className="bg-orange-100 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&h=200&fit=crop&crop=center"
                alt="Moringa Honey"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-forest-900 italic mb-2">Moringa Honey</h3>
              <p className="text-sm text-forest-600 leading-relaxed">
                Moringa Honey is crafted from nectar collected mainly from moringa flowers, giving it a distinctive herbal aroma, rich flavor, and natural nutritional goodness.
              </p>
            </div>
          </div>

          <div className="bg-blue-100 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1607001373520-65e2d3e73765?w=200&h=200&fit=crop&crop=center"
                alt="Melipona Honey"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-forest-900 italic mb-2">Melipona Honey</h3>
              <p className="text-sm text-forest-600 leading-relaxed">
                Melipona Honey (Kombu Honey) is a rare honey crafted by tiny stingless bees, known for its rich aroma and unique natural taste. Traditionally valued and carefully collected in small quantities, it offers a truly premium honey experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-cream-50 py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-forest-900">Bestsellers</h2>
              <p className="mt-1 text-muted-foreground">Our most loved products</p>
            </div>
            <Link href="/products">
              <Button variant="outline" size="sm">
                View All <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Wild Forest Honey", price: 449, comparePrice: 599, image: "🍯" },
              { name: "Multiflora Raw Honey", price: 349, comparePrice: 499, image: "🌺" },
              { name: "Honey Gift Set (Pack of 3)", price: 999, comparePrice: 1299, image: "🎁" },
              { name: "Organic Beeswax Candle", price: 299, comparePrice: 399, image: "🕯️" },
              { name: "Glass Honey Jar 500ml", price: 199, comparePrice: 249, image: "🫙" },
              { name: "Tulsi Infused Honey", price: 399, comparePrice: 549, image: "🌿" },
              { name: "Cinnamon Honey", price: 379, comparePrice: 499, image: "🍂" },
              { name: "Kitchen Storage Set", price: 799, comparePrice: 999, image: "🏺" },
            ].map((product, i) => (
              <Link
                key={i}
                href="/products"
                className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="aspect-square bg-gradient-to-br from-honey-50 to-cream-100 flex items-center justify-center text-6xl relative">
                  {product.image}
                  {product.comparePrice > product.price && (
                    <Badge className="absolute top-3 left-3" variant="destructive">
                      {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm text-forest-900 group-hover:text-honey-700 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-bold text-forest-900">₹{product.price}</span>
                    {product.comparePrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.comparePrice}
                      </span>
                    )}
                  </div>
                  <Button size="sm" className="w-full mt-3" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container py-16">
        <div className="bg-gradient-to-r from-forest-800 to-forest-900 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold">Why Choose GrabWay?</h2>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-honey-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sourced Directly from Beekeepers</h4>
                    <p className="text-sm text-forest-200">No middlemen. Farm-fresh honey delivered to your home.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-honey-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Lab Tested & Certified</h4>
                    <p className="text-sm text-forest-200">Every batch tested for purity and quality.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-honey-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Eco-Friendly Packaging</h4>
                    <p className="text-sm text-forest-200">Glass jars and recyclable materials. Good for you and the planet.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="text-center text-8xl">
              🐝
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-honey-50 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-forest-900">What Our Customers Say</h2>
            <p className="mt-2 text-muted-foreground">Trusted by thousands of happy customers across India</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-honey-200 shadow-sm">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-honey-400 text-honey-400" />
                  ))}
                </div>
                <p className="text-sm text-forest-700 leading-relaxed">
                  &ldquo;{t.comment}&rdquo;
                </p>
                <div className="mt-4 pt-4 border-t border-honey-100">
                  <p className="font-semibold text-sm text-forest-900">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <div className="bg-gradient-to-r from-honey-500 to-honey-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold">Get 10% Off Your First Order</h2>
          <p className="mt-2 text-honey-100 max-w-md mx-auto">
            Sign up for our newsletter and get an exclusive discount code for your first purchase.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-forest-900 placeholder:text-forest-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-forest-800 hover:bg-forest-900 text-white px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
