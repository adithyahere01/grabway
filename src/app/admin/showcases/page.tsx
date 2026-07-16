"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Trash2, Pencil } from "lucide-react";

interface Showcase {
  id: string;
  title: string;
  image: string;
  content: string;
  position: number;
  isActive: boolean;
}

export default function ShowcasesPage() {
  const [showcases, setShowcases] = useState<Showcase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShowcases();
  }, []);

  const fetchShowcases = async () => {
    try {
      const res = await fetch("/api/showcases");
      const data = await res.json();
      setShowcases(Array.isArray(data) ? data : []);
    } catch {
      console.error("Failed to fetch showcases");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this showcase entry?")) return;

    try {
      const res = await fetch(`/api/showcases/${id}`, { method: "DELETE" });
      if (res.ok) {
        setShowcases(showcases.filter((s) => s.id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch {
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-forest-900">Our Products & Practices</h1>
        <Link href="/admin/showcases/new">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Entry
          </Button>
        </Link>
      </div>

      {showcases.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No showcase entries yet.</p>
            <Link href="/admin/showcases/new">
              <Button variant="outline">Add Your First Entry</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {showcases.map((showcase) => (
            <Card key={showcase.id}>
              <CardContent className="flex items-center gap-4 py-4">
                {showcase.image && (
                  <img
                    src={showcase.image}
                    alt={showcase.title}
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold truncate">{showcase.title}</h3>
                    {!showcase.isActive && (
                      <Badge variant="secondary">Hidden</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Position: {showcase.position}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/admin/showcases/${showcase.id}`}>
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(showcase.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
