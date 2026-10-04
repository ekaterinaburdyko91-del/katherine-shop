'use client';
import { useEffect, useMemo, useState } from 'react';
import { categories, products } from '@/data/products';

type Cart = Record<string, number>;

export default function Shop() {
  const [cat, setCat] = useState('all');
  const [cart, setCart] = useState<Cart>({});
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ name: '', phone: '', city: '', branch: '' });
  const [err, setErr] = useState(''); const [busy, setBusy] = useState(false); const [paid, setPaid] = useState(false);

  useEffect(() => {
    try { setCart(JSON.parse(localStorage.getItem('kd-cart') || '{}')); } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem('kd-cart', JSON.stringify(cart)); } catch {} }, [cart]);

  const list = products.filter((p) => cat === 'all' || p.category === cat);
  const lines = useMemo(() => Object.entries(cart).map(([id, qty]) => ({ p: products.find((x) => x.id === id)!, qty })).filter((l) => l.p && l.qty > 0), [cart]);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + (l.p.price || 0) * l.qty, 0);
  const set = (id: string, q: number) => setCart((c) => ({ ...c, [id]: Math.max(0, Math.min(10000, q || 0)) }));

  async function pay() {
    setErr('');
    if (!f.name || !f.phone || !f.city || !f.branch) return setErr('Заповніть усі поля');
    setBusy(true);
    const r = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: lines.map((l) => ({ id: l.p.id, qty: l.qty })), ...f }) });
    const j = await r.json();
    if (!r.ok) { setBusy(false); return setErr(j.error || 'Помилка'); }
    setBusy(false); setPaid(true); setOpen(false); setCart({}); localStorage.removeItem('kd-cart');
  }

  const inp = 'w-full rounded-xl border border-[#E1E4CE] bg-white p-3 mb-3 text-sm';
  return (
    <div className="min-h-screen bg-[#F2F2ED] text-[#2A2D20]">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E1E4CE] bg-[#F2F2ED]/95 px-5 py-3">
        <span className="flex items-center gap-2"><img src="/logo-mark.png" alt="KD" className="h-9 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; }} /><span className="font-serif text-xl italic text-[#5B6639]">Katherine Design</span></span>
        <button onClick={() => setOpen(true)} className="rounded-full bg-[#5B6639] px-4 py-2 text-sm text-white">Кошик · {count}</button>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10">
        {paid && <div className="mb-6 rounded-xl bg-white p-4 text-center">Дякуємо за замовлення! Ми зателефонуємо або напишемо Вам для підтвердження й оплати.</div>}
        <h1 className="text-center text-3xl font-extrabold">Каталог</h1>
        <div className="my-6 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} className={`rounded-full border px-4 py-2 text-sm ${cat === c.id ? 'border-[#848F65] bg-[#848F65] text-white' : 'border-[#E1E4CE] bg-white'}`}>{c.label}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <article key={p.id} className="flex flex-col overflow-hidden rounded-2xl border border-[#E1E4CE] bg-white">
              {p.img ? <img src={p.img} alt={p.name} className="aspect-[4/5] w-full object-cover" /> : <div className="flex aspect-[4/5] items-center justify-center bg-[#E1E4CE] font-serif text-4xl italic text-[#AAB392]">KD</div>}
              <div className="flex flex-1 flex-col gap-1 p-4">
                <h3 className="font-extrabold">{p.name}</h3>
                <p className="flex-1 text-sm text-[#6A7152]">{p.desc}</p>
                {p.inStock && <span className="text-xs font-medium text-[#848F65]">в наявності</span>}
                <div className="font-medium">{p.price ? `${p.price} грн` : 'за запитом'}</div>
                {p.price && p.inStock ? (
                  <button onClick={() => set(p.id, (cart[p.id] || 0) + 1)} className="mt-2 rounded-xl bg-[#5B6639] py-3 text-sm text-white">У кошик</button>
                ) : (
                  <a href="https://ig.me/m/katherine_design_ukr" target="_blank" className="mt-2 rounded-xl border border-[#5B6639] py-3 text-center text-sm text-[#5B6639]">Запитати ціну</a>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>

      {open && (
        <div className="fixed inset-0 z-20 flex justify-end bg-black/40" onClick={() => setOpen(false)}>
          <aside className="h-full w-full max-w-md overflow-y-auto bg-[#F2F2ED] p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-extrabold">Кошик</h2><button onClick={() => setOpen(false)} className="text-2xl">×</button></div>
            {!lines.length ? <p className="text-[#6A7152]">Кошик порожній</p> : (<>
              {lines.map((l) => (
                <div key={l.p.id} className="mb-3 flex items-center justify-between gap-2 rounded-xl bg-white p-3 text-sm">
                  <div className="flex-1">{l.p.name}<br /><span className="text-[#6A7152]">{l.p.price} грн</span></div>
                  <button onClick={() => set(l.p.id, l.qty - 1)} className="h-8 w-8 rounded-full border">−</button>
                  <input value={l.qty} onChange={(e) => set(l.p.id, parseInt(e.target.value))} inputMode="numeric" className="w-14 rounded-lg border p-1 text-center" />
                  <button onClick={() => set(l.p.id, l.qty + 1)} className="h-8 w-8 rounded-full border">+</button>
                </div>
              ))}
              <div className="my-4 text-lg font-extrabold">Разом: {total} грн</div>
              <input className={inp} placeholder="Ім'я" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
              <input className={inp} placeholder="Телефон" inputMode="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
              <input className={inp} placeholder="Місто" value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} />
              <input className={inp} placeholder="Відділення «Нової пошти»" value={f.branch} onChange={(e) => setF({ ...f, branch: e.target.value })} />
              {err && <p className="mb-2 text-sm text-[#5B6639]">{err}</p>}
              <button disabled={busy} onClick={pay} className="w-full rounded-xl bg-[#5B6639] py-4 font-medium text-white disabled:opacity-60">{busy ? 'Зачекайте…' : `Оформити замовлення · ${total} грн`}</button>
            </>)}
          </aside>
        </div>
      )}
    </div>
  );
}
