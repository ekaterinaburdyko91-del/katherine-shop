import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { sign } from '@/lib/liqpay';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const f = await req.formData();
  const data = String(f.get('data') || ''), signature = String(f.get('signature') || '');
  const expected = sign(data);
  const a = Buffer.from(signature), b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return new NextResponse('bad signature', { status: 400 });

  const r = JSON.parse(Buffer.from(data, 'base64').toString('utf8'));
  const status = ['success', 'sandbox'].includes(r.status) ? 'paid'
    : ['failure', 'error', 'reversed'].includes(r.status) ? 'failed' : 'pending';

  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  await sb.from('orders').update({ status, liqpay_status: r.status, paid_at: status === 'paid' ? new Date().toISOString() : null }).eq('order_id', r.order_id);
  return NextResponse.json({ ok: true });
}
