"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, ImagePlus, X, Trash2 } from "lucide-react";

interface Showcase {
  id: string;
  title: string;
  image: string;
  content: string;
  position: number;
  isActive: boolean;
}

export default function EditShowcasePage() {
  const router = useRouter();
  const params = useParams();
  const showcaseId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    image: "",
    content: "",
    position: "0",
    isActive: true,
  });

  useEffect(() => {
    fetch("/api/showcases")
      .then((r) => r.json())
      .then((data: Showcase[]) => {
        const showcase = data.find((s) => s.id === showcaseId);
        if (showcase) {
          setForm({
            title: showcase.title,
            image: showcase.image,
            content: showcase.content,
            position: String(showcase.position),
            isActive: showcase.isActive,
          });
        } else {
          alert("Showcase not found");
          router.push("/admin/showcases");
        }
      })
      .catch(() => {
        alert("Failed to load");
        router.push("/admin/showcases");
      })
      .finally(() => setFetching(false));
  }, [showcaseId, router]);

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
        setForm((prev) => ({ ...prev, image: data.url }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/showcases/${showcaseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          position: parseInt(form.position),
        }),
      });

      if (res.ok) {
        router.push("/admin/showcases");
      } else {
        const err = await res.json();
        alert(err.error || "Failed to update");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/showcases/${showcaseId}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/showcases");
      } else {
        alert("Failed to delete");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/showcases")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-forest-900">Edit Showcase Entry</h1>
        </div>
        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleting}>
          {deleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
          Delete
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g., Raw Honey Comb (Multiflower)"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Description *</Label>
                  <textarea
                    id="content"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="flex min-h-[200px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder={"Write your product description here.\nUse '- ' at the start of a line for bullet points."}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Lines starting with &quot;- &quot; will be rendered as bullet points.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {form.image && (
                  <div className="relative inline-block">
                    <img
                      src={form.image}
                      alt="Showcase"
                      className="w-48 h-48 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: "" })}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    id="showcase-image-edit"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={uploading}
                    onClick={() => document.getElementById("showcase-image-edit")?.click()}
                  >
                    {uploading ? (
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    ) : (
                      <ImagePlus className="h-3 w-3 mr-1" />
                    )}
                    {uploading ? "Uploading..." : "Upload Image"}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPEG, PNG, or WebP. Max 5MB.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    type="number"
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">Lower numbers appear first.</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="isActive">Visible on page</Label>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
