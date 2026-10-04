// Єдине джерело товарів і цін. Ціни перераховуються на сервері, тому змінити їх у браузері не можна.
export type Product = {
  id: string; name: string; desc: string;
  price: number | null; // null = «за запитом», купити не можна
  category: 'business' | 'wedding';
  img: string; inStock: boolean;
};

export const categories = [
  { id: 'all', label: 'Усі' },
  { id: 'business', label: 'Поліграфія для бізнесу' },
  { id: 'wedding', label: 'Весільна поліграфія' },
] as const;

export const products: Product[] = [
  // Сертифікати із сургучною печаткою
  { id: 'cert-wax', name: 'Сертифікат із сургучною печаткою — шоколад', desc: 'Універсальний дизайнерський сертифікат у конверті з сургучною печаткою.', price: 70, category: 'business', img: '/products/cert-wax.jpg', inStock: true },
  { id: 'cert-wax-pink', name: 'Сертифікат із сургучною печаткою — пудровий', desc: 'Універсальний дизайнерський сертифікат у конверті з сургучною печаткою.', price: 70, category: 'business', img: '/products/cert-wax-pink.jpg', inStock: true },
  { id: 'cert-wax-cream', name: 'Сертифікат із сургучною печаткою — молочний', desc: 'Універсальний дизайнерський сертифікат у конверті з сургучною печаткою.', price: 70, category: 'business', img: '/products/cert-wax-cream.jpg', inStock: true },
  { id: 'cert-wax-green', name: 'Сертифікат із сургучною печаткою — смарагд', desc: 'Універсальний дизайнерський сертифікат у конверті з сургучною печаткою.', price: 70, category: 'business', img: '/products/cert-wax-green.jpg', inStock: true },
  // Сертифікати з магнітом
  { id: 'cert-magnet', name: 'Сертифікат із магнітом — світло-сірий', desc: 'Універсальний сертифікат із магнітним закриттям.', price: 70, category: 'business', img: '/products/cert-magnet.jpg', inStock: true },
  { id: 'cert-magnet-black', name: 'Сертифікат із магнітом — чорний', desc: 'Універсальний сертифікат із магнітним закриттям.', price: 70, category: 'business', img: '/products/cert-magnet-black.jpg', inStock: true },
  // Сертифікати з бантиком
  { id: 'cert-bow-black', name: 'Сертифікат із бантиком — чорний', desc: 'Універсальний сертифікат зі стрічкою-бантиком.', price: 75, category: 'business', img: '/products/cert-bow-black.jpg', inStock: true },
  { id: 'cert-bow-gold', name: 'Сертифікат із бантиком — молочний із золотом', desc: 'Універсальний сертифікат зі стрічкою-бантиком.', price: 75, category: 'business', img: '/products/cert-bow-gold.jpg', inStock: true },
  // Інше (поки за запитом)
  { id: 'gift-envelope', name: 'Gift-конверт', desc: 'Конверт для подарункового сертифіката.', price: null, category: 'business', img: '', inStock: false },
  { id: 'wedding-invite', name: 'Весільне запрошення', desc: 'Фактурний папір, тиснення, індивідуальний дизайн.', price: null, category: 'wedding', img: '', inStock: false },
];
