'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function useCountdown(target: Date) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return { h: 0, m: 0, s: 0 };
      return {
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      };
    };
    setTime(calc());
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, [target]);

  return time;
}

// target set to 7 hours 43 minutes from page mount or static time
const promoEnd = new Date(Date.now() + 7 * 3600 * 1000 + 43 * 60 * 1000 + 22 * 1000);

function Pad({ n }: { n: number }) {
  return <span>{String(n).padStart(2, '0')}</span>;
}

export function PromoSection() {
  const { h, m, s } = useCountdown(promoEnd);

  return (
    <section className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Section Heading */}
        <div className='text-center mb-8'>
          <p className='text-xs uppercase tracking-widest mb-1' style={{ color: '#b85c6e' }}>
            Unmissable Offers
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              color: '#2c1a0e',
            }}
            className='font-bold'
          >
            DEALS YOU CANNOT MISS
          </h2>
        </div>

        {/* Banners Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {/* Card 1: Flash Sale with Countdown */}
          <div
            className='group rounded-2xl overflow-hidden relative flex flex-col justify-between p-6 min-h-[260px] shadow-sm hover:shadow-lg transition-all duration-300'
            style={{
              background: 'linear-gradient(135deg, #b85c6e 0%, #8b3a4a 100%)',
              color: '#fff',
            }}
          >
            <div className='absolute right-0 top-0 w-36 h-36 rounded-full opacity-10 -translate-y-1/4 translate-x-1/4 bg-white transition-transform group-hover:scale-110 duration-500' />
            <div>
              <span className='text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full'>
                Flash Sale
              </span>
              <h3 className='mt-3 font-serif font-bold text-xl leading-snug'>
                Up to 50% Off On Bestsellers
              </h3>
              <p className='mt-1.5 text-xs text-white/80 leading-relaxed'>
                Premium skincare & makeup essentials.
              </p>
            </div>
            <div className='mt-4 flex items-end justify-between gap-2'>
              <Link
                href='/product'
                className='ant-btn-primary px-4 py-2 bg-white text-xs font-bold rounded-full uppercase tracking-wider shadow hover:scale-105 transition-transform'
              >
                Shop Now
              </Link>
              {/* Timer UI */}
              <div className='flex gap-2 text-center shrink-0'>
                {[{ v: h, l: 'HRS' }, { v: m, l: 'MIN' }, { v: s, l: 'SEC' }].map(({ v, l }) => (
                  <div key={l} className='flex flex-col bg-white/10 px-2 py-1 rounded-md min-w-[38px]'>
                    <span className='text-sm font-bold leading-none'><Pad n={v} /></span>
                    <span className='text-[8px] opacity-75 mt-0.5 font-semibold'>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: New Arrivals */}
          <div className='group rounded-2xl overflow-hidden relative flex flex-col justify-between p-6 min-h-[260px] shadow-sm hover:shadow-lg transition-all duration-300 text-white'>
            <img
              src='https://images.unsplash.com/photo-1599022484220-967921f2217c?w=600&fit=crop'
              alt='New arrivals skincare'
              className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
            />
            {/* Dark tint overlay */}
            <div className='absolute inset-0 bg-slate-950/45 group-hover:bg-slate-950/40 transition-colors' />

            <div className='relative z-10'>
              <span className='text-[10px] font-bold uppercase tracking-wider bg-black/35 px-2 py-0.5 rounded-full border border-white/10'>
                New In
              </span>
              <h3 className='mt-3 font-serif font-bold text-xl leading-snug'>
                New Season, New Glow
              </h3>
              <p className='mt-1.5 text-xs text-white/80 leading-relaxed'>
                Explore fresh arrivals from top beauty labels.
              </p>
            </div>
            <Link
              href='/product'
              className='relative z-10 self-start px-4 py-2 rounded-full text-xs text-white font-bold uppercase tracking-wider border border-white/60 transition-colors [&]:!text-white hover:bg-white hover:[&]:!text-black hover:bg-white hover:text-black transition-colors'
            >
              Explore →
            </Link>
          </div>

          {/* Card 3: Brand Deals */}
          <div className='group rounded-2xl overflow-hidden relative flex flex-col justify-between p-6 min-h-[260px] shadow-sm hover:shadow-lg transition-all duration-300 text-white'>
            <img
              src='https://plus.unsplash.com/premium_photo-1670584248601-187ba4c8b301?w=600&fit=crop'
              alt='Exclusive brand deals'
              className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
            />
            {/* Dark tint overlay */}
            <div className='absolute inset-0 bg-slate-950/50 group-hover:bg-slate-950/40 transition-colors' />

            <div className='relative z-10'>
              <span className='text-[10px] font-bold uppercase tracking-wider bg-black/35 px-2 py-0.5 rounded-full border border-white/10'>
                Brand Offers
              </span>
              <h3 className='mt-3 font-serif font-bold text-xl leading-snug'>
                Treasure of Glow Cosmetics
              </h3>
              <p className='mt-1.5 text-xs text-white/80 leading-relaxed'>
                Save up to 35% on global skincare and makeup.
              </p>
            </div>
            <Link
              href='/product'
              className='relative z-10 self-start px-4 py-2 rounded-full text-xs text-white font-bold uppercase tracking-wider border border-white/60 transition-colors [&]:!text-white hover:bg-white hover:[&]:!text-black hover:bg-white hover:text-black transition-colors'
            >
              See Deals →
            </Link>
          </div>

          {/* Card 4: Free Gifts */}
          <div className='group rounded-2xl overflow-hidden relative flex flex-col justify-between p-6 min-h-[260px] shadow-sm hover:shadow-lg transition-all duration-300 text-white'>
            <img
              src='https://images.unsplash.com/photo-1635868388791-6d2987bb59cb?w=600&fit=crop'
              alt='Free gifts campaign'
              className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
            />
            {/* Dark tint overlay */}
            <div className='absolute inset-0 bg-slate-950/45 group-hover:bg-slate-950/35 transition-colors' />

            <div className='relative z-10'>
              <span className='text-[10px] font-bold uppercase tracking-wider bg-black/35 px-2 py-0.5 rounded-full border border-white/10'>
                Gift Campaign
              </span>
              <h3 className='mt-3 font-serif font-bold text-xl leading-snug'>
                Free Tote Bag On Purchase
              </h3>
              <p className='mt-1.5 text-xs text-white/80 leading-relaxed'>
                Claim a signature makeup tote on orders over ৳1,999.
              </p>
            </div>
            <Link
              href='/product'
              className='btn relative z-10 self-start px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-white/60 transition-colors [&]:!text-white hover:bg-white hover:[&]:!text-black hover:bg-white hover:[&]:!text-black'
            >
              Claim Gift →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
