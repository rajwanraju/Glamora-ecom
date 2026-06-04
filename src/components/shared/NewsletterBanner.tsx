'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section
      className='py-16 px-4'
      style={{ background: 'linear-gradient(135deg, #2c1a0e 0%, #4a2530 100%)' }}
    >
      <div className='max-w-2xl mx-auto text-center text-white'>
        <Mail size={36} className='mx-auto mb-4 opacity-60' style={{ color: '#e8c4b0' }} />
        <h2
          className='mb-3'
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
        >
          Get Beauty Secrets & Exclusive Offers
        </h2>
        <p className='text-sm opacity-70 mb-8 max-w-md mx-auto'>
          Subscribe to our newsletter and be the first to know about new arrivals, flash sales, and expert beauty tips.
        </p>
        {submitted ? (
          <div className='inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-sm'>
            ✓ You're subscribed! Welcome to Glamora Beauty Club.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='flex gap-2 max-w-md mx-auto'>
            <input
              type='email'
              placeholder='your@email.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='flex-1 px-4 py-3 rounded-full text-sm text-foreground bg-white outline-none'
              required
            />
            <button
              type='submit'
              className='px-6 py-3 rounded-full text-white text-sm font-semibold shrink-0 transition-opacity hover:opacity-90 cursor-pointer font-inter'
              style={{ backgroundColor: '#b85c6e' }}
            >
              Subscribe
            </button>
          </form>
        )}
        <p className='text-xs opacity-40 mt-4'>No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
