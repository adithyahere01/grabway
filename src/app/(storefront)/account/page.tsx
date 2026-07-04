"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Heart,
  MapPin,
  User,
  Shield,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-honey-500" />
      </div>
    );
  }

  const user = session?.user;
  const isAdmin = (user as { role?: string })?.role === "ADMIN";

  const menuItems = [
    {
      title: "My Orders",
      description: "Track, return, or buy things again",
      href: "/orders",
      icon: Package,
    },
    {
      title: "My Wishlist",
      description: "Your saved products",
      href: "/wishlist",
      icon: Heart,
    },
    {
      title: "My Addresses",
      description: "Edit addresses for orders",
      href: "/account/addresses",
      icon: MapPin,
    },
  ];

  if (isAdmin) {
    menuItems.push({
      title: "Admin Panel",
      description: "Manage products, orders & users",
      href: "/admin",
      icon: Shield,
    });
  }

  return (
    <div className="container py-8 max-w-4xl">
      {/* Profile header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-honey-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-2xl">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      {/* Menu grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="hover:border-honey-400 hover:shadow-md transition-all cursor-pointer h-full">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="w-12 h-12 bg-cream-100 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6 text-honey-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
