'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    tag: 'Korean Skincare Fest',
    headline: 'Unlock Glass Skin\nRadiance Today',
    sub: 'Get up to 25% off on our bestselling Korean skincare. Cleansers, toners, serums & more.',
    cta: 'Shop Skincare',
    image:
      'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=1600&h=700&fit=crop&auto=format',
    gradient:
      'linear-gradient(to right, rgba(44, 26, 14, 0.9) 0%, rgba(44, 26, 14, 0.45) 50%, rgba(44, 26, 14, 0.1) 100%)',
    link: '/shop?category=Skincare',
  },
  {
    id: 2,
    tag: 'Summer Essentials',
    headline: 'Authentic Makeup\nFor Every Occasion',
    sub: 'Premium lipsticks, cushions, and eyeshadows from top global cosmetic brands.',
    cta: 'Shop Makeup',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=700&fit=crop&auto=format',
    gradient:
      'linear-gradient(to right, rgba(184, 92, 110, 0.9) 0%, rgba(184, 92, 110, 0.45) 50%, rgba(184, 92, 110, 0.1) 100%)',
    link: '/shop?category=Makeup',
  },
  {
    id: 3,
    tag: 'Luxury Haircare',
    headline: 'Salon-Quality Care\nIn Your Hands',
    sub: 'Deeply nourish, repair, and protect your tresses with argan oil treatments.',
    cta: 'Shop Haircare',
    image:
      'https://images.unsplash.com/photo-1608979048467-6194dabc6a3d?w=1600&h=700&fit=crop&auto=format',
    gradient:
      'linear-gradient(to right, rgba(44, 26, 14, 0.9) 0%, rgba(44, 26, 14, 0.45) 50%, rgba(44, 26, 14, 0.1) 100%)',
    link: '/shop?category=Haircare',
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5500);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className='relative h-[320px] w-full overflow-hidden bg-slate-900 select-none sm:h-[420px] md:h-[480px] lg:h-[540px]'>
      {/* Slides Container */}
      <div className='relative h-full w-full'>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 h-full w-full transition-all duration-1000 ease-in-out ${
              index === current
                ? 'z-10 scale-100 opacity-100'
                : 'pointer-events-none z-0 scale-105 opacity-0'
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.headline}
              className='absolute inset-0 h-full w-full object-cover'
            />

            {/* Gradient Overlay */}
            <div
              className='absolute inset-0 h-full w-full'
              style={{ background: slide.gradient }}
            />

            {/* Content Container */}
            <div className='absolute inset-0 flex h-full w-full items-center'>
              <div className='mx-auto w-full max-w-7xl space-y-3 px-6 text-white sm:space-y-5 md:px-12'>
                <span className='inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md md:text-xs'>
                  {slide.tag}
                </span>
                <h1
                  className='leading-tight font-bold whitespace-pre-line'
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1.8rem, 5vw, 3.4rem)',
                  }}
                >
                  {slide.headline}
                </h1>
                <p className='line-clamp-3 max-w-lg text-xs leading-relaxed text-white/80 sm:text-sm md:text-base'>
                  {slide.sub}
                </p>
                <div className='pt-2'>
                  <Link
                    href={slide.link}
                    className='ant-btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-lg transition-transform hover:scale-105 sm:text-sm'
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Control Arrows */}
      <button
        onClick={prev}
        className='absolute top-1/2 left-4 z-20 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40 sm:h-10 sm:w-10'
        aria-label='Previous Slide'
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className='absolute top-1/2 right-4 z-20 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40 sm:h-10 sm:w-10'
        aria-label='Next Slide'
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots Indicator */}
      <div className='absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2'>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className='h-2 cursor-pointer rounded-full transition-all duration-300'
            style={{
              width: i === current ? '20px' : '8px',
              backgroundColor: i === current ? '#b85c6e' : 'rgba(255, 255, 255, 0.4)',
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
