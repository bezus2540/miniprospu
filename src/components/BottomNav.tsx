"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  label: string;
  href: string;
  icon: React.ReactNode;
  match: (path: string) => boolean; // เงื่อนไขเช็ค active
};

export default function BottomNav() {
  const pathname = usePathname();

  const tabs: Tab[] = [
    {
      label: "Home",
      href: "/shop",
      icon: <path d="M3 10.5l9-7 9 7V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" />,
      match: (p) => p === "/shop",
    },
    {
      label: "Categories",
      href: "/categories",
      icon: <path d="M4 6h7v7H4V6zm9 0h7v7h-7V6zM4 15h7v7H4v-7zm9 0h7v7h-7v-7z" />,
      match: (p) => p.startsWith("/categories"),
    },
    {
      label: "Cart",
      href: "/cart",
      icon: <path d="M3 4h2l2 12h10l2-8H7" />,
      match: (p) => p.startsWith("/cart"),
    },
    {
      label: "Account",
      href: "/account",
      icon: <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm6 8a6 6 0 10-12 0" />,
      match: (p) => p.startsWith("/account"),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-md -translate-x-1/2 bg-white/95 backdrop-blur-md shadow-[0_-6px_20px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-4 gap-1 border-t border-gray-200 px-2 py-3 text-xs">
        {tabs.map((t) => {
          const active = t.match(pathname || "/");
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex flex-col items-center gap-1 rounded-xl px-2 py-1 ${
                active ? "text-pink-700" : "text-gray-600 hover:text-gray-900"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {t.icon}
              </svg>
              <span>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
