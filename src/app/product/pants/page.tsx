"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const PRODUCT = {
  id: "pants",
  name: "กางเกงนักศึกษา",
  price: 299,
  img: "/products/pants.png",
  desc: "เสื้อนักศึกษา ผ้าใส่สบาย ระบายอากาศดี ทรงมาตรฐาน",
};

const SIZES = ["S", "M", "L", "XL"] as const;

const formatTHB = (n: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

export default function ShirtPage() {
  const router = useRouter();
  const { addItem } = useCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<(typeof SIZES)[number] | null>("M");

  function addToCart() {
    if (!size) {
      alert("กรุณาเลือกขนาด (Size) ก่อน");
      return;
    }
    addItem({
      id: PRODUCT.id,
      name: PRODUCT.name,
      price: PRODUCT.price,
      img: PRODUCT.img,
      size,
      qty,
    });
    router.push("/cart");
  }

  return (
    <div className="min-h-screen w-full bg-pink-200 flex justify-center">
      <div className="relative w-full max-w-md bg-pink-100 min-h-screen shadow-2xl pb-24">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md">
          <div className="flex items-center gap-3 px-4 py-3">
            <Link href="/shop" className="rounded-full p-2 hover:bg-gray-100" aria-label="Back">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <h1 className="text-lg font-semibold">{PRODUCT.name}</h1>
          </div>
        </header>

        {/* Content */}
        <main className="px-4 py-4 space-y-4">
          <div className="rounded-2xl bg-white p-4 shadow">
            <div className="flex items-center justify-center">
              <img src={PRODUCT.img} alt={PRODUCT.name} className="h-56 w-auto object-contain" />
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-bold">{PRODUCT.name}</h2>
              <p className="mt-1 text-pink-700 font-semibold">{formatTHB(PRODUCT.price)}</p>
              <p className="mt-2 text-sm text-gray-600">{PRODUCT.desc}</p>
            </div>

            {/* Size picker */}
            <div className="mt-4">
              <div className="mb-2 text-sm font-semibold text-gray-800">เลือกขนาด</div>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => {
                  const active = size === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`rounded-full px-4 py-2 text-sm border ${
                        active
                          ? "bg-pink-600 text-white border-pink-600"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Qty */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50"
                  aria-label="ลดจำนวน"
                >
                  –
                </button>
                <span className="min-w-[2rem] text-center font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50"
                  aria-label="เพิ่มจำนวน"
                >
                  +
                </button>
              </div>
              <div className="text-sm text-gray-700">
                รวม:{" "}
                <span className="font-semibold text-pink-800">
                  {formatTHB(PRODUCT.price * qty)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 grid gap-2">
              <button
                onClick={addToCart}
                className="rounded-xl bg-pink-600 text-white py-3 font-semibold hover:bg-pink-700"
              >
                เพิ่มลงตะกร้า
              </button>
              <Link
                href="/cart"
                className="rounded-xl bg-gray-900/90 text-white text-center py-3 font-semibold hover:bg-gray-900"
              >
                ไปที่ตะกร้า
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
