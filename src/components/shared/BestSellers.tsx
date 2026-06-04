'use client';

import { ProductCard, Product } from './ProductCard';
import Link from 'next/link';

const bestSellers: Product[] = [
  {
    id: 101,
    name: 'Retinol Night Repair Cream 50ml',
    brand: 'Olay',
    price: 1480,
    originalPrice: 1850,
    rating: 5,
    reviews: 643,
    image: 'https://images.unsplash.com/photo-1708477199100-e4d5f56a8eb2?w=400&h=500&fit=crop&auto=format',
    badge: 'Top Rated',
  },
  {
    id: 102,
    name: 'Waterproof Kajal — Intense Black',
    brand: 'Maybelline',
    price: 210,
    originalPrice: 260,
    rating: 4.5,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1542452255191-c85a98f2c5d1?w=400&h=500&fit=crop&auto=format',
  },
  {
    id: 103,
    name: 'Repair & Protect Hair Serum 100ml',
    brand: 'Pantene',
    price: 630,
    originalPrice: 790,
    rating: 4,
    reviews: 327,
    image: 'https://images.unsplash.com/photo-1582616698198-f978da534162?w=400&h=500&fit=crop&auto=format',
    badge: 'Hot',
  },
  {
    id: 104,
    name: 'Brightening Face Pack with Turmeric',
    brand: 'Himalaya',
    price: 325,
    originalPrice: 420,
    rating: 4,
    reviews: 511,
    image: 'https://images.unsplash.com/photo-1598528738936-c50861cc75a9?w=400&h=500&fit=crop&auto=format',
  },
];

interface BestSellersProps {
  onClickProduct?: () => void;
}

export function BestSellers({ onClickProduct }: BestSellersProps) {
  return (
    <section className='py-16 bg-secondary/40'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8'>
          <div>
            <p className='text-xs uppercase tracking-widest mb-1' style={{ color: '#b85c6e' }}>Customer Favorites</p>
            <h2
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#2c1a0e' }}
            >
              Best Sellers
            </h2>
          </div>
          <Link href='/shop' className='text-sm underline underline-offset-4 font-semibold' style={{ color: '#b85c6e' }}>
            See all →
          </Link>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6'>
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} onClick={onClickProduct} />
          ))}
        </div>
      </div>
    </section>
  );
}
