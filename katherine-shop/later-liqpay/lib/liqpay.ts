import crypto from 'crypto';

export function sign(data: string) {
  const k = process.env.LIQPAY_PRIVATE_KEY!;
  return crypto.createHash('sha1').update(k + data + k).digest('base64');
}

export function encode(params: Record<string, unknown>) {
  const payload = { public_key: process.env.LIQPAY_PUBLIC_KEY, version: 3, ...params };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64');
  return { data, signature: sign(data) };
}
