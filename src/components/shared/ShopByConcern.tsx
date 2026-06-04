'use client';

import Link from 'next/link';

const concerns = [
  {
    label: 'Acne Prone',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop&auto=format',
    bg: '#fde8ec',
  },
  {
    label: 'Brightening',
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=300&h=300&fit=crop&auto=format',
    bg: '#fceae0',
  },
  {
    label: 'Hair Fall',
    image: 'https://images.unsplash.com/photo-1522337094133-f3750226488a?w=300&h=300&fit=crop&auto=format',
    bg: '#fdf0e8',
  },
  {
    label: 'Anti-Aging',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=300&h=300&fit=crop&auto=format',
    bg: '#f5e8fd',
  },
  {
    label: 'Dry Skin',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop&auto=format',
    bg: '#e8f5fd',
  },
  {
    label: 'Large Pores',
    image: 'https://images.unsplash.com/photo-1556229174-5e42a09e45af?w=300&h=300&fit=crop&auto=format',
    bg: '#fdf8e8',
  },
];

export function ShopByConcern() {
  return (
    <section className='py-16 bg-white border-y border-border'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='text-center mb-10'>
          <p className='text-xs uppercase tracking-widest mb-1' style={{ color: '#b85c6e' }}>
            Targeted Solutions
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              color: '#2c1a0e',
            }}
          >
            SHOP BY CONCERN
          </h2>
        </div>

        <div className='grid grid-cols-3 sm:grid-cols-6 gap-6 md:gap-8'>
          {concerns.map((concern) => (
            <Link
              key={concern.label}
              href='/shop?category=SHOP BY CONCERN'
              className='flex flex-col items-center gap-3 group'
            >
              <div
                className='w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 shadow-md group-hover:shadow-lg relative'
                style={{ backgroundColor: concern.bg }}
              >
                <img
                  src={concern.image}
                  alt={concern.label}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity' />
              </div>
              <span className='text-xs md:text-sm font-semibold text-center text-foreground group-hover:text-primary transition-colors'>
                {concern.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
