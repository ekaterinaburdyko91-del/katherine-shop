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
  { id: 'cert-wax', name: 'Сертифікат із сургучною печаткою', desc: 'Універсальний дизайнерський сертифікат у конверті з сургучною печаткою.', price: 70, category: 'business', img: '/products/cert-wax.jpg', inStock: true },
  { id: 'cert-magnet', name: 'Сертифікат із магнітом', desc: 'Універсальний сертифікат із магнітним закриттям.', price: 70, category: 'business', img: '', inStock: true },
  { id: 'cert-bow', name: 'Сертифікат із бантиком', desc: 'Універсальний сертифікат зі стрічкою-бантиком.', price: 75, category: 'business', img: '', inStock: true },
  { id: 'gift-envelope', name: 'Gift-конверт', desc: 'Конверт для подарункового сертифіката.', price: null, category: 'business', img: '', inStock: false },
  { id: 'wedding-invite', name: 'Весільне запрошення', desc: 'Фактурний папір, тиснення, індивідуальний дизайн.', price: null, category: 'wedding', img: '', inStock: false },
];
