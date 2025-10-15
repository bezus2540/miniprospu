"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const ok = username.trim() === "66402702" && password === "12345";
      if (!ok) {
        setError("Username หรือ Password ไม่ถูกต้อง");
        return;
      }
      router.push("/shop");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* พื้นหลังเต็มจอ (ใส่ไฟล์ที่ /public/spu.jpg) */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url(/spu.jpg)" }}
        aria-hidden
      />
      {/* เลเยอร์ทึบดำบาง ๆ เพื่อเพิ่มคอนทราสต์ */}
      <div className="absolute inset-0 -z-10 bg-black/40" aria-hidden />

      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-gray-800/60 shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
          <form onSubmit={onSubmit} className="p-8">
            <h1 className="mb-2 text-center text-2xl font-semibold text-white">Login</h1>
            <p className="mb-6 text-center text-sm text-gray-200/80">
              ใส่ Username และ Password เพื่อเข้าใช้งาน
            </p>

            {error && (
              <div
                className="mb-4 rounded-lg border border-red-500/30 bg-red-500/20 px-4 py-2 text-red-200"
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-100">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/60 outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/20"
                  placeholder="yourname"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-100">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 pr-12 text-white placeholder-white/60 outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/20"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1 text-xs text-white/80 hover:bg-white/10"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-xl bg-white/90 px-4 py-3 font-semibold text-gray-900 shadow hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
              </button>
            </div>


          
          </form>
        </div>
      </main>
    </div>
  );
}
