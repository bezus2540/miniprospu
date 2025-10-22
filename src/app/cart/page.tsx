"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useCart } from "@/lib/cart";

const formatTHB = (n: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

export default function CartPage() {
  const { items, updateQty, removeItem } = useCart();

  const subTotal = items.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <div className="min-h-screen w-full bg-pink-200 flex justify-center">
      <div className="relative w-full max-w-md bg-pink-100 min-h-screen shadow-2xl pb-28">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md">
          <div className="flex items-center gap-3 px-4 py-3">
            <Link href="/shop" className="rounded-full p-2 hover:bg-gray-100" aria-label="Back">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <h1 className="text-lg font-semibold">My Cart</h1>
          </div>
        </header>

        {/* List */}
        <main className="px-4 py-3 space-y-4">
          {items.map((p) => {
            const lineTotal = p.price * p.qty;
            const key = `${p.id}-${p.size ?? ""}`;
            return (
              <article key={key} className="rounded-2xl bg-pink-300/60 p-3">
                <div className="relative rounded-2xl bg-white p-3 shadow-sm">
                  <button
                    onClick={() => removeItem(p.id, p.size)}
                    className="absolute right-2 -top-3 h-8 w-8 rounded-full bg-white shadow flex items-center justify-center"
                    aria-label={`Remove ${p.name}`}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <div className="grid grid-cols-[96px,1fr] gap-3 items-center">
                    <div className="h-28 rounded-xl bg-gray-50 flex items-center justify-center">
                      <img src={p.img} alt={p.name} className="h-full w-full object-contain p-2" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-sm">{p.name}</h3>
                          {p.size && <p className="text-xs text-gray-600">size {p.size}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(p.id, p.size, Math.max(1, p.qty - 1))}
                            className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50"
                          >
                            –
                          </button>
                          <span className="min-w-[1.5rem] text-center text-sm font-semibold">{p.qty}</span>
                          <button
                            onClick={() => updateQty(p.id, p.size, p.qty + 1)}
                            className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{formatTHB(p.price)} / ชิ้น</span>
                        <div className="text-sm font-semibold text-pink-800">{formatTHB(lineTotal)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {items.length === 0 && (
            <p className="text-center text-sm text-gray-600 pt-6">ตะกร้าของคุณยังว่างอยู่</p>
          )}

          <div className="mt-2 rounded-2xl bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <span className="font-semibold">ยอดรวม</span>
              <span className="font-bold">{formatTHB(subTotal)}</span>
            </div>
            <Link
              href="/pay"
              className="mt-3 block rounded-xl bg-pink-600 text-white text-center py-3 font-semibold hover:bg-pink-700"
            >
              ชำระเงิน
            </Link>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
