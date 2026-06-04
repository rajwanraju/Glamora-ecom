'use client';

import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Tasnim Hossain',
    location: 'Dhaka',
    rating: 5,
    text: "I've been using the Vitamin C serum for 3 weeks now and my skin has never looked this radiant. Delivery was super fast and the packaging was gorgeous!",
    product: 'Hydra Boost Vitamin C Serum',
    avatar: 'T',
    color: '#b85c6e',
  },
  {
    id: 2,
    name: 'Nafisa Rahman',
    location: 'Chittagong',
    rating: 5,
    text: 'Finally found a platform that stocks international brands at reasonable prices. The Minimalist sunscreen is my holy grail now. Will definitely order again!',
    product: 'SPF 50+ Daily Sunscreen',
    avatar: 'N',
    color: '#8b3a4a',
  },
  {
    id: 3,
    name: 'Sadia Islam',
    location: 'Sylhet',
    rating: 4,
    text: 'Great product quality and authentic items. The Lakme lipstick shade is exactly as shown in pictures. Customer service was very helpful when I had questions.',
    product: 'Matte Velvet Lipstick',
    avatar: 'S',
    color: '#c4866a',
  },
  {
    id: 4,
    name: 'Priya Chowdhury',
    location: 'Rajshahi',
    rating: 5,
    text: 'Best beauty shopping experience! The flash sale saved me so much money. My skin routine is now complete thanks to Glamora. Highly recommend to everyone.',
    product: 'Retinol Night Cream',
    avatar: 'P',
    color: '#9e5e8a',
  },
];

export function Testimonials() {
  return (
    <section className='py-16 bg-background'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='text-center mb-10'>
          <p className='text-xs uppercase tracking-widest mb-1' style={{ color: '#b85c6e' }}>Happy Customers</p>
          <h2
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#2c1a0e' }}
          >
            What Our Shoppers Say
          </h2>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {reviews.map((r) => (
            <div key={r.id} className='bg-white rounded-2xl p-6 border border-border flex flex-col gap-3 hover:shadow-md transition-shadow'>
              <Quote size={20} style={{ color: '#e8c4b0' }} />
              <p className='text-sm text-muted-foreground leading-relaxed flex-1'>"{r.text}"</p>
              <div className='flex gap-0.5 mt-1'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill={i < r.rating ? '#f59e0b' : 'none'} stroke='#f59e0b' />
                ))}
              </div>
              <div className='flex items-center gap-3 pt-2 border-t border-border'>
                <div
                  className='w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0'
                  style={{ backgroundColor: r.color }}
                >
                  {r.avatar}
                </div>
                <div>
                  <p className='text-sm font-medium text-foreground'>{r.name}</p>
                  <p className='text-xs text-muted-foreground'>{r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
