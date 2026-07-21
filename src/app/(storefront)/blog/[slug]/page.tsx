"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft, Calendar } from "lucide-react";
import { renderContent } from "@/lib/render-content";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string | null;
  metaDescription: string | null;
  publishedAt: string | null;
}

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blogs/${params.slug}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) fetchPost();
  }, [params.slug]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold text-forest-900 mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/blog"
          className="text-honey-700 hover:text-honey-800 font-medium inline-flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="container py-10 max-w-3xl mx-auto">
      <Link
        href="/blog"
        className="text-sm text-muted-foreground hover:text-forest-900 inline-flex items-center gap-1 mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-forest-900 leading-tight">
        {post.title}
      </h1>

      {post.publishedAt && (
        <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {formatDate(post.publishedAt)}
        </div>
      )}

      {post.coverImage && (
        <div className="mt-6 rounded-xl overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <div className="mt-8 space-y-4">
        {renderContent(post.content)}
      </div>
    </article>
  );
}
