"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { renderContent } from "@/lib/render-content";

interface Showcase {
  id: string;
  title: string;
  image: string;
  content: string;
  position: number;
}

export default function OurProductsPage() {
  const [showcases, setShowcases] = useState<Showcase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/showcases")
      .then((r) => r.json())
      .then((data) => setShowcases(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-12">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-foreground">Our Products</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-center text-forest-900 mb-12">
        Our Products &amp; Practices
      </h1>

      {showcases.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">
          Content coming soon.
        </p>
      ) : (
        <div className="space-y-16">
          {showcases.map((showcase, index) => (
            <section
              key={showcase.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 md:gap-12 items-center`}
            >
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold text-forest-900">
                  {showcase.title}
                </h2>
                <div>{renderContent(showcase.content)}</div>
              </div>
              {showcase.image && (
                <div className="flex-1 max-w-md">
                  <img
                    src={showcase.image}
                    alt={showcase.title}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
