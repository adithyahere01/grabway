import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Tag,
  BarChart3,
  FileImage,
  FileText,
} from "lucide-react";

const adminNav = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: FolderTree },
  { name: "Showcases", href: "/admin/showcases", icon: FileImage },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Coupons", href: "/admin/coupons", icon: Tag },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="flex min-h-[calc(100vh-160px)]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border hidden lg:block">
        <div className="p-6">
          <h2 className="text-lg font-bold text-forest-900 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Admin Panel
          </h2>
        </div>
        <nav className="px-3">
          {adminNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-forest-700 hover:bg-honey-50 hover:text-honey-800 transition-colors mb-1"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-cream-50">{children}</main>
    </div>
  );
}
