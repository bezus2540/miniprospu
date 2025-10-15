"use client";
import BottomNav from "@/components/BottomNav";

export default function ShopPage() {
  const featured = [
    { id: "shirt", name: "เสื้อนักศึกษา", price: 399, img: "/products/shirt.png" },
    { id: "pants", name: "กางเกงนักศึกษา", price: 299, img: "/products/pants.png" },
  ];

  const bestSellers = [
    { id: "shoes", name: "รองเท้านักศึกษา", price: 499, img: "/products/shoes.jpg" },
    { id: "socks", name: "ถุงเท้า", price: 39, img: "/products/socks.jpg" },
    { id: "tie", name: "เน็คไท", price: 299, img: "/products/tie.jpg" },
    { id: "belt", name: "เข็มขัด", price: 99, img: "/products/belt.jpg" },
  ];

  return (
    <div className="min-h-screen w-full bg-pink-200 flex justify-center">
      <div className="relative w-full max-w-md bg-pink-100 min-h-screen shadow-2xl">
       
        <header className="sticky top-0 z-10 bg-pink-100/80 backdrop-blur-md">
          <div className="flex items-center gap-3 px-4 pt-4">
            <img src="/logo.png" alt="SPU" className="h-8 w-auto object-contain" />
            <h1 className="text-lg font-semibold">Shop</h1>
          </div>

          {/* Search */}
          <div className="px-4 pb-4 pt-3">
            <div className="flex items-center gap-2 rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] px-4 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.6 3.6a7.5 7.5 0 0013.05 13.05z" />
              </svg>
              <input type="text" placeholder="Search products" className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="px-4 pb-28 pt-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold">สินค้า</h2>
            <button className="text-sm font-semibold text-pink-700">สินค้าทั้งหมด</button>
          </div>

          {/* Featured */}
          <div className="grid grid-cols-2 gap-4">
            {featured.map((p) => (
              <div key={p.id} className="rounded-3xl bg-white p-3 shadow-lg">
                <div className="rounded-2xl bg-white">
                  <img src={p.img} alt={p.name} className="mx-auto h-36 w-auto object-contain" />
                </div>
                <div className="mt-3">
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-pink-700">THB : {p.price} บาท</p>
                </div>
              </div>
            ))}
          </div>

          {/* Best sellers */}
          <h3 className="mt-6 text-xl font-bold">สินค้าขายดี</h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {bestSellers.map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <img src={p.img} alt={p.name} className="h-full w-full object-contain" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-gray-600">THB : {p.price} บาท</p>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Bottom nav (component) */}
        <BottomNav active="home" />
      </div>
    </div>
  );
}
