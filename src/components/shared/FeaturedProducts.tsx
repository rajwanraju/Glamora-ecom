'use client';

import { useState } from 'react';
import { ProductCard, Product } from './ProductCard';
import Link from 'next/link';

const tabs = ['All', 'Skincare', 'Makeup', 'Haircare', 'Body'];

const products: Product[] = [
  {
    id: 1,
    name: 'Hydra Boost Vitamin C Serum 30ml',
    brand: 'Dermatica',
    price: 1250,
    originalPrice: 1650,
    rating: 4.5,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1613803745799-ba6c10aace85?w=400&h=500&fit=crop&auto=format',
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Matte Velvet Lipstick — Rosewood',
    brand: 'Lakme',
    price: 480,
    originalPrice: 650,
    rating: 4,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=400&h=500&fit=crop&auto=format',
    badge: 'New',
  },
  {
    id: 3,
    name: 'SPF 50+ Daily Sunscreen Fluid 50ml',
    brand: 'Minimalist',
    price: 890,
    originalPrice: 990,
    rating: 5,
    reviews: 521,
    image: 'https://images.unsplash.com/photo-1622910076411-b126ff7e469b?w=400&h=500&fit=crop&auto=format',
  },
  {
    id: 4,
    name: 'Nourishing Argan Oil Hair Mask 200ml',
    brand: 'Matrix',
    price: 740,
    originalPrice: 950,
    rating: 4.5,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=400&h=500&fit=crop&auto=format',
    badge: 'Sale',
  },
  {
    id: 5,
    name: 'Rose Water Toner with Hyaluronic Acid',
    brand: 'Plum',
    price: 545,
    originalPrice: 690,
    rating: 4,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1622018680711-9d8a97b4eb6c?w=400&h=500&fit=crop&auto=format',
  },
  {
    id: 6,
    name: 'Foundation Cushion SPF 30 — Ivory',
    brand: 'MAC',
    price: 2100,
    originalPrice: 2500,
    rating: 4.5,
    reviews: 267,
    image: 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=400&h=500&fit=crop&auto=format',
    badge: 'Popular',
  },
  {
    id: 7,
    name: 'Deep Cleansing Foam Face Wash 150ml',
    brand: 'Neutrogena',
    price: 395,
    originalPrice: 480,
    rating: 4,
    reviews: 432,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=500&fit=crop&auto=format',
  },
  {
    id: 8,
    name: 'Body Butter Shea & Cocoa 250ml',
    brand: 'The Body Shop',
    price: 960,
    originalPrice: 1200,
    rating: 5,
    reviews: 384,
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400&h=500&fit=crop&auto=format',
  },
];

interface FeaturedProductsProps {
  onClickProduct?: () => void;
}

export function FeaturedProducts({ onClickProduct }: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <section className='py-16 bg-background'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8'>
          <div>
            <p className='text-xs uppercase tracking-widest mb-1' style={{ color: '#b85c6e' }}>Handpicked for You</p>
            <h2
              className='leading-tight'
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#2c1a0e' }}
            >
              Featured Products
            </h2>
          </div>
          <Link href='/shop' className='text-sm underline underline-offset-4 font-semibold' style={{ color: '#b85c6e' }}>
            View all products →
          </Link>
        </div>

        {/* Tabs */}
        <div className='flex gap-2 flex-wrap mb-8'>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className='px-4 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer'
              style={
                activeTab === tab
                  ? { backgroundColor: '#b85c6e', color: '#fff' }
                  : { backgroundColor: '#f0e8e3', color: '#2c1a0e' }
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onClick={onClickProduct} />
          ))}
        </div>
      </div>
    </section>
  );
}
