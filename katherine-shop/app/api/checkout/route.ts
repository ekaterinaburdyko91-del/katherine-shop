import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { products } from '@/data/products';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b || !Array.isArray(b.items) || !b.items.length) return NextResponse.json({ error: 'Кошик порожній' }, { status: 400 });
  const name = String(b.name || '').trim(), phone = String(b.phone || '').trim();
  const city = String(b.city || '').trim(), branch = String(b.branch || '').trim();
  if (!name || phone.length < 9 || !city || !branch) return NextResponse.json({ error: 'Заповніть усі поля' }, { status: 400 });

  // Ціни беремо з нашого каталогу, а не з браузера
  let total = 0; const lines: { id: string; name: string; qty: number; price: number }[] = [];
  for (const it of b.items) {
    const p = products.find((x) => x.id === it.id);
    const qty = Math.floor(Number(it.qty));
    if (!p || p.price == null || !p.inStock || !(qty >= 1 && qty <= 10000))
      return NextResponse.json({ error: 'Некоректний товар у кошику' }, { status: 400 });
    total += p.price * qty; lines.push({ id: p.id, name: p.name, qty, price: p.price });
  }

  const orderId = `kd-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { error } = await sb.from('orders').insert({ order_id: orderId, items: lines, total, name, phone, city, np_branch: branch, status: 'new' });
  if (error) return NextResponse.json({ error: 'Не вдалося створити замовлення' }, { status: 500 });
  return NextResponse.json({ ok: true, orderId, total });
}
