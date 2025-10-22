import Link from "next/link";
import BottomNav from "@/components/BottomNav";

type Item = {
  id: string;
  name: string;
  price: number;
  img: string;
  href: string;
};

const shirts: Item[] = [
  { id: "shirt-men",   name: "เสื้อนักศึกษา (ชาย)",  price: 399, img: "/products/shirt.png",      href: "/product/shirt" },
  { id: "shirt-women", name: "เสื้อนักศึกษา (หญิง)", price: 399, img: "/products/shirt-women.jpg", href: "/product/shirt-women" },
];

const bottoms: Item[] = [
  { id: "pants",  name: "กางเกงนักศึกษา", price: 299, img: "/products/pants.png",  href: "/product/pants" },
  { id: "skirt",  name: "กระโปรงนักศึกษา", price: 299, img: "/products/skirt.png", href: "/product/skirt" },
];

const shoe: Item[] = [
  { id: "shoes",  name: "รองเท้าคัทชู", price: 299, img: "/products/shoes.jpg",  href: "/product/shoes" },
  { id: "shoes-women",  name: "รองเท้าคัทชู(หญิง)", price: 299, img: "/products/shoes-women.jpg", href: "/product/shoes-women" },
];
const sock: Item[] = [
  { id: "socks",  name: "ถุงเท้า", price: 39, img: "/products/socks.jpg",  href: "/product/socks" },
 
];
const belt: Item[] = [
  { id: "belt",  name: "เข็มขัดนักศึกษา(ชาย)", price: 99, img: "/products/belt.jpg",  href: "/product/belt" },
  { id: "belt-women",  name: "เข็มขัดนักศึกษา(หญิง)", price: 99, img: "/products/belt-women.png", href: "/product/belt-women" },
];
const tie: Item[] = [
  { id: "tie-men",   name: "เนคไท (ชาย)",  price: 299, img: "/products/tie.jpg",      href: "/product/tie" },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen w-full bg-pink-200 flex justify-center">
      <div className="relative w-full max-w-md bg-pink-100 min-h-screen shadow-2xl pb-28">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md">
          <div className="flex items-center gap-3 px-4 py-3">
            <h1 className="text-lg font-semibold">หมวดหมู่สินค้า</h1>
          </div>
        </header>

        <main className="px-4 pt-2 pb-28">
          {/* กลุ่ม: เสื้อ */}
          <section className="mt-2">
            <h2 className="text-xl font-bold mb-3">เสื้อนักศึกษา</h2>
            <div className="grid grid-cols-2 gap-4">
              {shirts.map((p) => (
                <Link
                  key={p.id}
                  href={p.href}
                  className="block rounded-3xl bg-white p-3 shadow-lg hover:shadow-xl transition"
                >
                  <div className="rounded-2xl">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="mx-auto h-36 w-auto object-contain"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-pink-700">THB : {p.price} บาท</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* กลุ่ม: ส่วนล่าง */}
          <section className="mt-6">
            <h2 className="text-xl font-bold mb-3">กางเกง / กระโปรง</h2>
            <div className="grid grid-cols-2 gap-4">
              {bottoms.map((p) => (
                <Link
                  key={p.id}
                  href={p.href}
                  className="block rounded-3xl bg-white p-3 shadow-lg hover:shadow-xl transition"
                >
                  <div className="rounded-2xl">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="mx-auto h-36 w-auto object-contain"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-pink-700">THB : {p.price} บาท</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <section className="mt-6">
            <h2 className="text-xl font-bold mb-3">รองเท้าคัทชู</h2>
            <div className="grid grid-cols-2 gap-4">
              {shoe.map((p) => (
                <Link
                  key={p.id}
                  href={p.href}
                  className="block rounded-3xl bg-white p-3 shadow-lg hover:shadow-xl transition"
                >
                  <div className="rounded-2xl">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="mx-auto h-36 w-auto object-contain"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-pink-700">THB : {p.price} บาท</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <section className="mt-6">
            <h2 className="text-xl font-bold mb-3">ถุงเท้านักศึกษา</h2>
            <div className="grid grid-cols-2 gap-4">
              {sock.map((p) => (
                <Link
                  key={p.id}
                  href={p.href}
                  className="block rounded-3xl bg-white p-3 shadow-lg hover:shadow-xl transition"
                >
                  <div className="rounded-2xl">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="mx-auto h-36 w-auto object-contain"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-pink-700">THB : {p.price} บาท</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <section className="mt-2">
            <h2 className="text-xl font-bold mb-3">เข็มขัดนักศึกษา</h2>
            <div className="grid grid-cols-2 gap-4">
              {belt.map((p) => (
                <Link
                  key={p.id}
                  href={p.href}
                  className="block rounded-3xl bg-white p-3 shadow-lg hover:shadow-xl transition"
                >
                  <div className="rounded-2xl">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="mx-auto h-36 w-auto object-contain"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-pink-700">THB : {p.price} บาท</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <section className="mt-2">
            <h2 className="text-xl font-bold mb-3">เนคไท</h2>
            <div className="grid grid-cols-2 gap-4">
              {tie.map((p) => (
                <Link
                  key={p.id}
                  href={p.href}
                  className="block rounded-3xl bg-white p-3 shadow-lg hover:shadow-xl transition"
                >
                  <div className="rounded-2xl">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="mx-auto h-36 w-auto object-contain"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-pink-700">THB : {p.price} บาท</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>

        {/* Bottom nav */}
        <BottomNav />
      </div>
    </div>
  );
}
