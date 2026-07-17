"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Loader2, Trash2, ImagePlus } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  brand: string | null;
  image: string | null;
  showOnHomepage: boolean;
  _count: { products: number };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [brandFilter, setBrandFilter] = useState<string>("ALL");
  const [newCategory, setNewCategory] = useState({ name: "", description: "", brand: "", showOnHomepage: false });
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (res.ok) {
        setImageUrl(data.url);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name) return;
    setLoading(true);

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newCategory.name,
        description: newCategory.description || undefined,
        brand: newCategory.brand || undefined,
        showOnHomepage: newCategory.showOnHomepage,
        image: imageUrl || undefined,
      }),
    });

    if (res.ok) {
      setNewCategory({ name: "", description: "", brand: "", showOnHomepage: false });
      setImageUrl("");
      fetchCategories();
    }
    setLoading(false);
  };

  const filteredCategories = brandFilter === "ALL"
    ? categories
    : categories.filter((cat) => cat.brand === brandFilter);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    const res = await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchCategories();
    } else {
      const err = await res.json();
      alert(err.error || "Failed to delete category");
    }
  };

  const handleToggleHomepage = async (id: string, showOnHomepage: boolean) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ showOnHomepage }),
    });
    if (res.ok) {
      fetchCategories();
    } else {
      alert("Failed to update category");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-forest-900 mb-6">Categories</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Create Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add Category</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="catName">Name *</Label>
                <Input
                  id="catName"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="e.g., Raw Honey"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="catDesc">Description</Label>
                <Input
                  id="catDesc"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Optional description"
                />
              </div>
              <div className="space-y-2">
                <Label>Image</Label>
                {imageUrl ? (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-border">
                      <img src={imageUrl} alt="Category" className="w-full h-full object-cover" />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => setImageUrl("")}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      id="cat-image-upload"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={uploading}
                      onClick={() => document.getElementById("cat-image-upload")?.click()}
                    >
                      {uploading ? (
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      ) : (
                        <ImagePlus className="h-3 w-3 mr-1" />
                      )}
                      {uploading ? "Uploading..." : "Upload Image"}
                    </Button>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="catBrand">Brand *</Label>
                <select
                  id="catBrand"
                  value={newCategory.brand}
                  onChange={(e) => setNewCategory({ ...newCategory, brand: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select brand</option>
                  <option value="GRABWAY_NATURALS">Grabway Naturals</option>
                  <option value="GRABWAY_ESSENTIALS">Grabway Essentials</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showOnHomepage"
                  checked={newCategory.showOnHomepage}
                  onChange={(e) => setNewCategory({ ...newCategory, showOnHomepage: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="showOnHomepage">Show on Homepage</Label>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-1" />}
                Add Category
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Categories List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">All Categories</CardTitle>
                <div className="flex gap-1">
                  {["ALL", "GRABWAY_NATURALS", "GRABWAY_ESSENTIALS"].map((brand) => (
                    <Button
                      key={brand}
                      variant={brandFilter === brand ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBrandFilter(brand)}
                      className="text-xs"
                    >
                      {brand === "ALL" ? "All" : brand === "GRABWAY_NATURALS" ? "Naturals" : "Essentials"}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredCategories.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8">
                  No categories found.
                </p>
              ) : (
                <div className="space-y-2">
                  {filteredCategories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {cat.image ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-border flex-shrink-0">
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-cream-100 flex items-center justify-center flex-shrink-0 text-lg">
                            🏷️
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{cat.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {cat._count.products} product{cat._count.products !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {cat.showOnHomepage && (
                          <Badge variant="warning">Homepage</Badge>
                        )}
                        <Badge
                          variant={cat.brand === "GRABWAY_NATURALS" ? "success" : cat.brand === "GRABWAY_ESSENTIALS" ? "default" : "secondary"}
                        >
                          {cat.brand === "GRABWAY_NATURALS"
                            ? "Naturals"
                            : cat.brand === "GRABWAY_ESSENTIALS"
                            ? "Essentials"
                            : "No Brand"}
                        </Badge>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          title={cat.showOnHomepage ? "Remove from homepage" : "Show on homepage"}
                          onClick={() => handleToggleHomepage(cat.id, !cat.showOnHomepage)}
                        >
                          {cat.showOnHomepage ? "🏠" : "➕"}
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(cat.id, cat.name)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
