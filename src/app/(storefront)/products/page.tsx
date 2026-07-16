"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface Showcase {
  id: string;
  title: string;
  image: string;
  content: string;
  position: number;
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length > 0) {
      elements.push(
        <ul key={`bullets-${elements.length}`} className="list-disc list-inside space-y-1 my-3 text-forest-700">
          {bulletBuffer.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      bulletBuffer = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith("- ")) {
      bulletBuffer.push(line.slice(2));
    } else {
      flushBullets();
      if (line.trim() === "") {
        elements.push(<br key={`br-${i}`} />);
      } else {
        elements.push(
          <p key={`p-${i}`} className="text-forest-700 leading-relaxed">
            {line}
          </p>
        );
      }
    }
  });

  flushBullets();
  return elements;
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
