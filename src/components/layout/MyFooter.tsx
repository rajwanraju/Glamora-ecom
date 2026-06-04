'use client';

import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function MyFooter({
  className = '',
}: {
  readonly className?: React.HTMLAttributes<HTMLDivElement>['className'];
}) {
  return (
    <footer className={`bg-slate-950 text-white/70 font-inter w-full ${className}`}>
      <div className='max-w-7xl mx-auto px-4 pt-16 pb-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12'>
          {/* Brand Column */}
          <div className='col-span-1 md:col-span-1.5 pr-4'>
            <span
              className='text-3xl font-bold tracking-tight'
              style={{ fontFamily: "'Playfair Display', serif", color: '#e8c4b0', fontStyle: 'italic' }}
            >
              Glamora
            </span>
            <p className='mt-4 text-xs leading-relaxed text-white/50 max-w-xs font-medium'>
              Glamora is your premier authentic beauty shopping destination, offering over 10,000+ products from 450+ globally trusted brands. Dedicated to bringing out your unique glow with verified quality.
            </p>
            <div className='flex gap-3 mt-6'>
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href='#'
                  className='w-8 h-8 rounded-full flex items-center justify-center border border-white/10 hover:border-[#b85c6e] hover:bg-[#b85c6e]/10 text-white/60 hover:text-white transition-all duration-300'
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: ALL ABOUT BEAUTY */}
          <div>
            <h5 className='text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-white/10 pb-2 m-0'>
              All About Beauty
            </h5>
            <ul className='space-y-2.5 list-none p-0 mt-3'>
              {['Our Story', 'Authenticity Guaranteed', 'Glamora Magazine', 'Join Our Team', 'Share Your Love', 'Know Your Routine'].map((item) => (
                <li key={item}>
                  <Link href='/shop' className='text-xs text-white/50 hover:text-[#b85c6e] transition-colors font-medium'>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: QUICK LINKS */}
          <div>
            <h5 className='text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-white/10 pb-2 m-0'>
              Quick Links
            </h5>
            <ul className='space-y-2.5 list-none p-0 mt-3'>
              {['Exclusive Offers', 'Top Brands', "Men's Grooming", 'Skin Concerns Hub', 'New Arrivals'].map((item) => (
                <li key={item}>
                  <Link href='/shop' className='text-xs text-white/50 hover:text-[#b85c6e] transition-colors font-medium'>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: HELP */}
          <div>
            <h5 className='text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-white/10 pb-2 m-0'>
              Help & Policies
            </h5>
            <ul className='space-y-2.5 list-none p-0 mt-3'>
              {['Contact Us', 'Points Program', 'Shipping & Delivery', 'Refund & Return Policy', 'Terms & Conditions', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link href='/shop' className='text-xs text-white/50 hover:text-[#b85c6e] transition-colors font-medium'>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: PAYMENTS ACCEPTED */}
          <div>
            <h5 className='text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-white/10 pb-2 m-0'>
              Payments Accepted
            </h5>
            <div className='flex flex-wrap gap-2 text-[10px] text-white/60 mt-3'>
              {['bKash', 'Nagad', 'Rocket', 'Visa', 'Mastercard', 'Cash On Delivery'].map((p) => (
                <span
                  key={p}
                  className='px-2.5 py-1 bg-white/5 border border-white/10 rounded-md select-none font-semibold text-center hover:bg-white/10 hover:border-white/20 transition-all cursor-default'
                >
                  {p}
                </span>
              ))}
            </div>
            <p className='mt-4 text-[10px] text-white/45 leading-relaxed font-semibold'>
              All transactions are secured via SSLCommerz encrypted checkout.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Trust Badges */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-t border-b border-white/10 mb-8 mt-12 bg-white/[0.01] px-4 rounded-xl'>
          {[
            { icon: '🚚', title: 'Free Delivery', sub: 'On orders over ৳999' },
            { icon: '✅', title: '100% Authentic', sub: 'Genuine products only' },
            { icon: '↩️', title: 'Easy Returns', sub: '7-day return policy' },
            { icon: '🔒', title: 'Secure Checkout', sub: 'SSL encrypted payment' },
          ].map((b) => (
            <div key={b.title} className='flex items-center gap-3'>
              <span className='text-2xl filter drop-shadow-sm'>{b.icon}</span>
              <div>
                <p className='text-xs font-bold text-white uppercase tracking-wider m-0'>{b.title}</p>
                <p className='text-[10px] text-white/40 mt-0.5 m-0 font-semibold'>{b.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Sub-Info */}
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-white/35 font-semibold'>
          <p>© 2026 Glamora Beauty Bangladesh. All rights reserved.</p>
          <div className='flex gap-4'>
            <a href='#' className='hover:underline'>Trade License: 03-98217</a>
            <a href='#' className='hover:underline'>Privacy Policy</a>
            <a href='#' className='hover:underline'>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
