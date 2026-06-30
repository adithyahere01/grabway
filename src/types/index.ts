export type ProductWithImages = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number | { toNumber: () => number };
  compareAtPrice: number | { toNumber: () => number } | null;
  sku: string | null;
  stock: number;
  weight: number | { toNumber: () => number } | null;
  categoryId: string | null;
  isActive: boolean;
  isFeatured: boolean;
  gstRate: number | { toNumber: () => number };
  createdAt: Date;
  updatedAt: Date;
  images: {
    id: string;
    url: string;
    altText: string | null;
    position: number;
  }[];
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
};

export type CategoryWithCount = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  isActive: boolean;
  _count: {
    products: number;
  };
  children?: CategoryWithCount[];
};
