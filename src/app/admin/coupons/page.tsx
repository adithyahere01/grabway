"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Loader2 } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  discountType: string;
  discountValue: number;
  minOrderAmount: number | null;
  maxDiscount: number | null;
  usageLimit: number | null;
  usedCount: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    code: "",
    discountType: "PERCENTAGE",
    discountValue: "",
    minOrderAmount: "",
    maxDiscount: "",
    usageLimit: "",
    validFrom: "",
    validTo: "",
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    const res = await fetch("/api/admin/coupons");
    if (res.ok) {
      const data = await res.json();
      setCoupons(data);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          code: form.code.toUpperCase(),
          discountValue: parseFloat(form.discountValue),
          minOrderAmount: form.minOrderAmount ? parseFloat(form.minOrderAmount) : null,
          maxDiscount: form.maxDiscount ? parseFloat(form.maxDiscount) : null,
          usageLimit: form.usageLimit ? parseInt(form.usageLimit) : null,
        }),
      });
      if (res.ok) {
        setForm({
          code: "", discountType: "PERCENTAGE", discountValue: "",
          minOrderAmount: "", maxDiscount: "", usageLimit: "", validFrom: "", validTo: "",
        });
        fetchCoupons();
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleToggleCoupon = async (id: string, newActive: boolean) => {
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: newActive }),
      });
      if (res.ok) {
        fetchCoupons();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-forest-900 mb-6">Coupons</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Create Coupon</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-3">
              <div className="space-y-1">
                <Label>Code *</Label>
                <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="WELCOME10" required />
              </div>
              <div className="space-y-1">
                <Label>Discount Type</Label>
                <select value={form.discountType} onChange={(e) => setForm({ ...form, discountType: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm">
                  <option value="PERCENTAGE">Percentage</option>
                  <option value="FIXED">Fixed Amount</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label>Value *</Label>
                <Input type="number" value={form.discountValue} onChange={(e) => setForm({ ...form, discountValue: e.target.value })} placeholder={form.discountType === "PERCENTAGE" ? "10" : "100"} required />
              </div>
              <div className="space-y-1">
                <Label>Min Order Amount</Label>
                <Input type="number" value={form.minOrderAmount} onChange={(e) => setForm({ ...form, minOrderAmount: e.target.value })} placeholder="500" />
              </div>
              <div className="space-y-1">
                <Label>Max Discount</Label>
                <Input type="number" value={form.maxDiscount} onChange={(e) => setForm({ ...form, maxDiscount: e.target.value })} placeholder="200" />
              </div>
              <div className="space-y-1">
                <Label>Usage Limit</Label>
                <Input type="number" value={form.usageLimit} onChange={(e) => setForm({ ...form, usageLimit: e.target.value })} placeholder="100" />
              </div>
              <div className="space-y-1">
                <Label>Valid From *</Label>
                <Input type="datetime-local" value={form.validFrom} onChange={(e) => setForm({ ...form, validFrom: e.target.value })} required />
              </div>
              <div className="space-y-1">
                <Label>Valid To *</Label>
                <Input type="datetime-local" value={form.validTo} onChange={(e) => setForm({ ...form, validTo: e.target.value })} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-1" />}
                Create Coupon
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">All Coupons</CardTitle></CardHeader>
            <CardContent>
              {coupons.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8">No coupons yet</p>
              ) : (
                <div className="space-y-3">
                  {coupons.map((coupon) => (
                    <div key={coupon.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-mono font-bold">{coupon.code}</p>
                        <p className="text-xs text-muted-foreground">
                          {coupon.discountType === "PERCENTAGE" ? `${coupon.discountValue}% off` : `₹${coupon.discountValue} off`}
                          {coupon.minOrderAmount && ` • Min ₹${coupon.minOrderAmount}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <select
                          value={coupon.isActive ? "active" : "inactive"}
                          onChange={(e) => handleToggleCoupon(coupon.id, e.target.value === "active")}
                          className={`text-xs font-medium rounded-full px-3 py-1 border appearance-none cursor-pointer ${
                            coupon.isActive
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-gray-100 text-gray-600 border-gray-200"
                          }`}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            Used: {coupon.usedCount}{coupon.usageLimit ? `/${coupon.usageLimit}` : ""}
                          </p>
                        </div>
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
