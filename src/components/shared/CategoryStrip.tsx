'use client';

import Link from 'next/link';

const categories = [
  { label: 'Skincare', emoji: '✨', bg: '#fde8ec' },
  { label: 'Makeup', emoji: '💄', bg: '#fceae0' },
  { label: 'Haircare', emoji: '💆‍♀️', bg: '#fdf0e8' },
  { label: 'Fragrance', emoji: '🌸', bg: '#f5e8fd' },
  { label: 'Body Care', emoji: '🧴', bg: '#e8f5fd' },
  { label: 'Sun Care', emoji: '☀️', bg: '#fdf8e8' },
  { label: 'Tools', emoji: '🪥', bg: '#e8fde8' },
  { label: 'Men\'s', emoji: '🧔', bg: '#e8eafd' },
];

export function CategoryStrip() {
  return (
    <section className='py-10 bg-white border-b border-border'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-4 sm:grid-cols-8 gap-4'>
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={`/shop?category=${cat.label}`}
              className='flex flex-col items-center gap-2 group'
            >
              <div
                className='w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform'
                style={{ backgroundColor: cat.bg }}
              >
                {cat.emoji}
              </div>
              <span className='text-xs text-center text-foreground group-hover:text-primary transition-colors font-medium'>
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
