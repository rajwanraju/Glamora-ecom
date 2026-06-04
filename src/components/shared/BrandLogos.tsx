'use client';

const brands = [
  'Lakme', 'Maybelline', 'L\'Oréal', 'MAC', 'Neutrogena',
  'The Body Shop', 'Plum', 'Minimalist', 'Olay', 'Himalaya',
];

export function BrandLogos() {
  return (
    <section className='py-12 bg-white border-y border-border overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 mb-6 text-center'>
        <p className='text-xs uppercase tracking-widest text-muted-foreground'>Trusted Brands We Carry</p>
      </div>
      <div className='flex gap-10 animate-marquee whitespace-nowrap' style={{ animation: 'marquee 22s linear infinite' }}>
        {[...brands, ...brands].map((brand, i) => (
          <span
            key={i}
            className='inline-flex items-center px-6 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors cursor-pointer shrink-0'
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
