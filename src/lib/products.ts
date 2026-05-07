import productsData from '../../data/products.json';

export type Product = {
  id: string;
  slug: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  category: string;
  images: string[];
  sourcePrice: number;
  retailPrice: number;
  currency: string;
  sourcePlatform: 'aliexpress' | 'alibaba' | 'amazon';
  sourceUrl: string;
  shippingDays: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
};

export const products: Product[] = productsData as Product[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
}

export function getCategories(): string[] {
  return Array.from(new Set(products.map(p => p.category)));
}

export function formatPrice(price: number, locale: string): string {
  if (locale === 'ar') {
    return `${price.toFixed(2)} ر.س`;
  }
  return `SAR ${price.toFixed(2)}`;
}

export function getPlatformName(platform: string): string {
  const names: Record<string, string> = {
    aliexpress: 'AliExpress',
    alibaba: 'Alibaba',
    amazon: 'Amazon'
  };
  return names[platform] || platform;
}
