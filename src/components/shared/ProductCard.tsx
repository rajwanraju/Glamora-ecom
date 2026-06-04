'use client';

import { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@store/slices/cartSlice';

import { useRouter } from 'next/navigation';

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart({ product }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWish = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWished(!wished);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push('/product');
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className='relative bg-secondary overflow-hidden aspect-[4/5]'>
        <img
          src={product.image}
          alt={product.name}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
        />
        {product.badge && (
          <span
            className='absolute top-3 left-3 text-white text-xs px-2 py-0.5 rounded-full'
            style={{ backgroundColor: '#b85c6e' }}
          >
            {product.badge}
          </span>
        )}
        {discount && (
          <span className='absolute top-3 right-10 text-white text-xs px-2 py-0.5 rounded-full bg-green-600'>
            -{discount}%
          </span>
        )}
        <button
          onClick={handleWish}
          className='absolute top-3 right-3 p-1.5 rounded-full bg-white shadow hover:scale-110 transition-transform z-10'
        >
          <Heart
            size={16}
            fill={wished ? '#b85c6e' : 'none'}
            stroke={wished ? '#b85c6e' : '#8a6a5e'}
          />
        </button>

        {/* Quick add overlay */}
        <div className='absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10'>
          <button
            onClick={handleAdd}
            className='w-full py-3 text-white text-sm flex items-center justify-center gap-2 transition-colors'
            style={{ backgroundColor: added ? '#4caf50' : '#b85c6e' }}
          >
            <ShoppingCart size={16} />
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className='p-4 flex flex-col gap-1.5 flex-1'>
        <span className='text-xs text-muted-foreground uppercase tracking-wide'>{product.brand}</span>
        <p className='text-sm text-foreground leading-snug line-clamp-2 hover:text-primary transition-colors font-medium'>
          {product.name}
        </p>
        <div className='flex items-center gap-1 mt-0.5'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'}
              stroke='#f59e0b'
            />
          ))}
          <span className='text-xs text-muted-foreground ml-1'>({product.reviews})</span>
        </div>
        <div className='flex items-baseline gap-2 mt-auto pt-2'>
          <span className='text-base font-semibold' style={{ color: '#b85c6e' }}>
            ৳{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className='text-xs text-muted-foreground line-through'>
              ৳{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
