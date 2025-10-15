'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type Item = { name: string; qty: number; price: number };

const items: Item[] = [
  { name: 'เสื้อนักศึกษา', qty: 1, price: 399 },
  { name: 'กางเกงนักศึกษา', qty: 1, price: 299 },
  { name: 'เข็มขัด', qty: 2, price: 198 },
  { name: 'เนคไท', qty: 2, price: 598 },
];

const formatTHB = (n: number) =>
  new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

export default function Page() {
  const router = useRouter();

  const [method, setMethod] = useState<'card' | 'promptpay' | 'linepay'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [exp, setExp] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);

const { subTotal, vat7, grandTotal } = useMemo(() => {
  const sub = items.reduce((s, it) => s + it.qty * it.price, 0);
  const vat = Math.round(sub * 0.07);
  return { subTotal: sub, vat7: vat, grandTotal: sub + vat };
}, []);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (method === 'card' && (!cardNumber || !exp || !cvv)) {
      alert('กรอกข้อมูลบัตรให้ครบก่อนนะ');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method,
          card: method === 'card' ? { cardNumber, exp, cvv } : undefined,
          items,
          totals: { subTotal,  vat7, grandTotal },
          room: 495,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      if (data?.ok) {
        alert('ชำระเงินสำเร็จ (เดโม่) 🎉');
        setCardNumber(''); setExp(''); setCvv('');
      } else {
        alert('ชำระเงินไม่สำเร็จ');
      }
    } catch (err) {
      console.error(err);
      alert('ชำระเงินไม่สำเร็จ ลองอีกครั้ง');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: 'url(/spu.jpg)' }}  // ใส่ไฟล์นี้ใน /public
    >
      <div className="absolute inset-0 bg-black/40" />

      <main className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-xl rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="text-sm tracking-widest text-amber-200">Spukk</div>
            <div className="text-white text-lg font-semibold">Payment</div>
          </div>

          {/* รายการอาหาร */}
          <div className="rounded-xl bg-white/10 border border-white/20 p-4 text-white">
            <div className="grid grid-cols-3 text-sm text-white/80 px-2">
              <div>รายการ</div>
              <div className="text-center">จำนวน</div>
              <div className="text-right">ยอดย่อย</div>
            </div>
            <div className="mt-2 space-y-2">
              {items.map((it, idx) => (
                <div key={idx} className="grid grid-cols-3 items-center rounded-lg bg-white/5 px-2 py-2">
                  <div className="truncate">{it.name}</div>
                  <div className="text-center">{it.qty}</div>
                  <div className="text-right">{formatTHB(it.qty * it.price).replace('฿', '')}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-1 text-sm">
              <Row label="ยอดรวม" value={subTotal} />
              <Row label="ภาษี 7%" value={vat7} />
              <div className="border-t border-white/20 pt-2 mt-2 grid grid-cols-2">
                <div className="font-semibold">ชำระทั้งหมด</div>
                <div className="text-right font-bold text-amber-200">
                  {formatTHB(grandTotal)}
                </div>
              </div>
            </div>
          </div>

          {/* วิธีชำระเงิน */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="text-white font-semibold mb-2">Credit/Debit Card</div>

            {/* tabs เลือกวิธีจ่าย */}
            <div className="mb-3 flex gap-2">
              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`px-3 py-1 rounded-full text-sm ${
                  method === 'card'
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                บัตรเครดิต/เดบิต
              </button>
              <button
                type="button"
                onClick={() => setMethod('promptpay')}
                className={`px-3 py-1 rounded-full text-sm ${
                  method === 'promptpay'
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                PromptPay
              </button>
              
            </div>

            {method === 'card' ? (
              <div className="space-y-3">
                <input
                  placeholder="Card Number"
                  inputMode="numeric"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(
                      e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim()
                    )
                  }
                  className="w-full rounded-lg bg-white/90 px-3 py-2 outline-none"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="MM/YY"
                    value={exp}
                    onChange={(e) =>
                      setExp(
                        e.target.value
                          .replace(/[^\d]/g, '')
                          .slice(0, 4)
                          .replace(/(^\d{2})(\d{0,2})/, (_m, a, b) => (b ? `${a}/${b}` : a))
                      )
                    }
                    className="rounded-lg bg-white/90 px-3 py-2 outline-none"
                  />
                  <input
                    placeholder="CVV"
                    inputMode="numeric"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/[^\d]/g, '').slice(0, 4))}
                    className="rounded-lg bg-white/90 px-3 py-2 outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-white/90">
                <img src="/pp.png" alt="PromptPay" className="h-8 w-auto" />
                
                <span className="text-sm">เลือก {method === 'promptpay' ? 'PromptPay' : 'LINE Pay'}</span>
              </div>
            )}

           

            <div className="mt-4 grid gap-3">
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-amber-300 hover:bg-amber-200 active:scale-[.99] py-3 font-semibold shadow disabled:opacity-60"
              >
                {loading ? 'กำลังชำระเงิน…' : 'Confirm Payment'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="text-white/70 hover:text-white text-sm"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid grid-cols-2">
      <div className="text-white/80">{label}</div>
      <div className="text-right text-white/90">{formatTHB(value).replace('฿', '')}</div>
    </div>
  );
}
