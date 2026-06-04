'use client';

import { useState } from 'react';
import { Heart, Check, ChevronLeft, ChevronRight, Shield, CreditCard, Headphones } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@store/slices/cartSlice';
import Link from 'next/link';

const productInfo = {
  id: 5656063,
  name: 'Beauty Glazed Luxury Raise Soft Makeup Primer - 203',
  brand: 'Beauty Glazed',
  price: 399,
  originalPrice: 550,
  size: '20 gm',
  sku: '39301',
  images: [
    'https://bk.shajgoj.com/storage/2026/01/beauty-glazed-luxury-raise-soft-makeup-primer-203.jpg',
    'https://bk.shajgoj.com/storage/2026/01/beauty-glazed-luxury-raise-soft-make-up-primer-0.jpg',
    'https://bk.shajgoj.com/storage/2026/01/beauty-glazed-luxury-raise-soft-make-up-primer-2.jpg',
    'https://bk.shajgoj.com/storage/2026/01/beauty-glazed-luxury-raise-soft-makeup-primer-203.jpg',
  ],
};

const bundleProduct = {
  id: 998877,
  name: 'Freedom Super Dry 8 Pad (Buy 1 Get 1)',
  brand: 'Freedom',
  price: 90,
  originalPrice: 180,
  image: 'https://bk.shajgoj.com/storage/2024/03/BOGO-SuperDry.png',
};

const offers = [
  { title: 'Shipping Offer', detail: 'Free Shipping', description: 'MAYA 699 Free delivery', expiry: 'Jun 4, 2026' },
  { title: 'Free Gift Offer', detail: 'Free Wazih Organic Glycerin', description: 'Free Wazih Organic Glycerin' },
  { title: 'Shipping Offer', detail: 'Free Shipping', description: 'Nirvana color 499 Free delivery', expiry: 'Jul 1, 2026' },
  { title: 'Shipping Offer', detail: 'Free Shipping', description: 'Lilac free delivery over 299', expiry: 'Jul 1, 2026' },
  { title: 'Shipping Offer', detail: 'Free Shipping', description: 'Skin Cafe 499 free delivery', expiry: 'Jul 1, 2026' },
  { title: 'Shipping Offer', detail: 'Free Shipping', description: 'Rajkonna free delivery 299', expiry: 'Jul 1, 2026' },
  { title: 'Shipping Offer', detail: 'Free Shipping', description: 'Ombre 399 Free Delivery', expiry: 'Jul 1, 2026' },
];

export function ProductDetails() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWished, setIsWished] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [offerIdx, setOfferIdx] = useState(0);
  const dispatch = useDispatch();

  const discount = Math.round(((productInfo.originalPrice - productInfo.price) / productInfo.originalPrice) * 100);
  const savedAmount = productInfo.originalPrice - productInfo.price;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: {
          id: productInfo.id,
          name: productInfo.name,
          brand: productInfo.brand,
          price: productInfo.price,
          image: productInfo.images[0],
        },
        quantity,
      })
    );
  };

  const handleAddBundle = () => {
    // Add primary product
    dispatch(
      addToCart({
        product: {
          id: productInfo.id,
          name: productInfo.name,
          brand: productInfo.brand,
          price: productInfo.price,
          image: productInfo.images[0],
        },
        quantity: 1,
      })
    );

    // Add bundle product
    dispatch(
      addToCart({
        product: {
          id: bundleProduct.id,
          name: bundleProduct.name,
          brand: bundleProduct.brand,
          price: bundleProduct.price,
          image: bundleProduct.image,
        },
        quantity: 1,
      })
    );
  };

  const nextOffer = () => {
    setOfferIdx((prev) => (prev + 1) % offers.length);
  };

  const prevOffer = () => {
    setOfferIdx((prev) => (prev - 1 + offers.length) % offers.length);
  };

  return (
    <div className='max-w-7xl mx-auto px-4 pt-10 pb-16'>
      {/* Back navigation */}
      <div className='mb-6'>
        <Link href='/' className='text-xs text-muted-foreground hover:text-primary uppercase tracking-wider font-bold'>
          ← Back to Shop
        </Link>
      </div>

      <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
        {/* Left Column: Image Gallery */}
        <div className='w-full lg:w-1/2 flex flex-col items-center'>
          {/* Active Image Box */}
          <div className='w-full max-w-md aspect-square bg-slate-50 border border-border/60 rounded-2xl overflow-hidden relative shadow-sm'>
            <img
              src={productInfo.images[activeImageIdx]}
              alt={productInfo.name}
              className='w-full h-full object-contain p-4'
            />
            {discount > 0 && (
              <span className='absolute top-4 left-4 text-xs font-bold text-white px-3 py-1 rounded-tr-xl rounded-bl-xl shadow' style={{ backgroundColor: '#b85c6e' }}>
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails Row */}
          <div className='flex gap-3 mt-4 overflow-x-auto py-1 max-w-md'>
            {productInfo.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIdx(i)}
                className={`w-18 h-18 rounded-lg overflow-hidden border-2 shrink-0 bg-slate-50 p-1 hover:border-primary/50 transition-all cursor-pointer ${
                  i === activeImageIdx ? 'border-primary shadow-sm' : 'border-border/60'
                }`}
              >
                <img src={img} alt={`thumbnail-${i}`} className='w-full h-full object-cover rounded-md' />
              </button>
            ))}
          </div>

          {/* Share Section */}
          <div className='mt-8 flex items-center gap-4 text-sm font-semibold text-muted-foreground'>
            <span>Share:</span>
            <div className='flex items-center gap-3'>
              {/* Facebook Share */}
              <button className='w-8 h-8 rounded-full bg-[#0965FE] flex items-center justify-center text-white hover:scale-105 transition-transform cursor-pointer' aria-label='Share on Facebook'>
                <svg viewBox='0 0 64 64' className='w-4 h-4 fill-current'><path d='M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z' /></svg>
              </button>
              {/* X Share */}
              <button className='w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white hover:scale-105 transition-transform cursor-pointer' aria-label='Share on X'>
                <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 512 512' className='w-3.5 h-3.5'><path d='M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z' /></svg>
              </button>
              {/* LinkedIn Share */}
              <button className='w-8 h-8 rounded-full bg-[#0077B5] flex items-center justify-center text-white hover:scale-105 transition-transform cursor-pointer' aria-label='Share on LinkedIn'>
                <svg viewBox='0 0 64 64' className='w-4 h-4 fill-current'><path d='M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z' /></svg>
              </button>
              {/* WhatsApp Share */}
              <button className='w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-105 transition-transform cursor-pointer' aria-label='Share on WhatsApp'>
                <svg viewBox='0 0 64 64' className='w-4 h-4 fill-current'><path d='m42.32286,33.93287c-0.5178,-0.2589 -3.04726,-1.49644 -3.52105,-1.66732c-0.4712,-0.17346 -0.81554,-0.2589 -1.15987,0.2589c-0.34175,0.51004 -1.33075,1.66474 -1.63108,2.00648c-0.30032,0.33658 -0.60064,0.36247 -1.11327,0.12945c-0.5178,-0.2589 -2.17994,-0.80259 -4.14759,-2.56312c-1.53269,-1.37217 -2.56312,-3.05503 -2.86603,-3.57283c-0.30033,-0.5178 -0.03366,-0.80259 0.22524,-1.06149c0.23301,-0.23301 0.5178,-0.59547 0.7767,-0.90616c0.25372,-0.31068 0.33657,-0.5178 0.51262,-0.85437c0.17088,-0.36246 0.08544,-0.64725 -0.04402,-0.90615c-0.12945,-0.2589 -1.15987,-2.79613 -1.58964,-3.80584c-0.41424,-1.00971 -0.84142,-0.88027 -1.15987,-0.88027c-0.29773,-0.02588 -0.64208,-0.02588 -0.98382,-0.02588c-0.34693,0 -0.90616,0.12945 -1.37736,0.62136c-0.4712,0.5178 -1.80194,1.76053 -1.80194,4.27186c0,2.51134 1.84596,4.945 2.10227,5.30747c0.2589,0.33657 3.63497,5.51458 8.80262,7.74113c1.23237,0.5178 2.1903,0.82848 2.94111,1.08738c1.23237,0.38836 2.35599,0.33657 3.24402,0.20712c0.99159,-0.15534 3.04985,-1.24272 3.47963,-2.45956c0.44013,-1.21683 0.44013,-2.22654 0.31068,-2.45955c-0.12945,-0.23301 -0.46601,-0.36247 -0.98382,-0.59548m-9.40068,12.84407l-0.02589,0c-3.05503,0 -6.08417,-0.82849 -8.72495,-2.38189l-0.62136,-0.37023l-6.47252,1.68286l1.73463,-6.29129l-0.41424,-0.64725c-1.70875,-2.71846 -2.6149,-5.85116 -2.6149,-9.07706c0,-9.39809 7.68934,-17.06155 17.15993,-17.06155c4.58253,0 8.88029,1.78642 12.11655,5.02268c3.23625,3.21036 5.02267,7.50812 5.02267,12.06476c-0.0078,9.3981 -7.69712,17.06155 -17.14699,17.06155' fill='white' /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Product Detail Info */}
        <div className='w-full lg:w-1/2 flex flex-col gap-5'>
          <div>
            <span className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>{productInfo.brand}</span>
            <h2
              className='text-xl sm:text-2xl font-serif font-bold text-foreground mt-1 leading-snug'
              style={{ color: '#2c1a0e' }}
            >
              {productInfo.name}
            </h2>
          </div>

          <div className='flex items-center gap-4 text-xs font-semibold text-muted-foreground border-b border-border pb-3'>
            <span>Size: {productInfo.size}</span>
            <span>|</span>
            <span>SKU: {productInfo.sku}</span>
          </div>

          {/* Pricing Row */}
          <div className='bg-secondary/30 p-4 rounded-xl border border-border/40'>
            <div className='flex items-center gap-4 flex-wrap'>
              <span className='text-2xl font-bold' style={{ color: '#b85c6e' }}>
                ৳{productInfo.price.toLocaleString()}
              </span>
              <span className='text-sm text-muted-foreground line-through'>
                ৳{productInfo.originalPrice.toLocaleString()}
              </span>
              <span className='text-xs font-bold text-green-600'>
                Save ৳{savedAmount.toLocaleString()} ({discount}% OFF)
              </span>
            </div>
          </div>

          {/* Marketing / Badges */}
          <div className='flex flex-col gap-2.5'>
            {/* App Promotion Badge */}
            <div className='inline-flex items-center gap-2 border border-border/60 bg-white px-3 py-2 rounded-lg text-xs font-medium w-fit text-slate-800'>
              <span className='flex items-center gap-1.5'>
                <svg viewBox='0 0 512 512' className='w-3.5 h-3.5 text-slate-700' fill='currentColor'>
                  <path d='M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z' />
                </svg>
                <span>Download App for:</span>
              </span>
              <a href='#' className='underline text-primary hover:text-primary/80 font-bold'>iOS</a>
              <span>or</span>
              <a href='#' className='underline text-primary hover:text-primary/80 font-bold'>Android</a>
            </div>

            {/* Bestseller Badge */}
            <div className='inline-flex items-center border border-border/60 bg-white px-3 py-2 rounded-lg text-xs w-fit text-slate-800 font-semibold gap-1.5'>
              <span className='bg-slate-900 text-white px-2 py-0.5 rounded-full text-[10px] uppercase font-bold'>
                No #21 Best Seller
              </span>
              <span>in</span>
              <a href='#' className='underline text-primary hover:text-primary/80 font-bold'>
                Beauty Glazed
              </a>
            </div>
          </div>

          {/* Add to Wishlist and Cart Panel */}
          <div className='flex items-center gap-3 mt-4 flex-wrap border-t border-border pt-6'>
            {/* Wishlist Button */}
            <button
              onClick={() => setIsWished(!isWished)}
              className='px-4.5 h-12 bg-slate-950 hover:bg-slate-800 text-white rounded-lg flex items-center justify-center shadow-sm transition-colors cursor-pointer'
              title='Add to Wishlist'
            >
              <Heart size={20} fill={isWished ? '#b85c6e' : 'none'} stroke={isWished ? '#b85c6e' : 'white'} />
            </button>

            {/* Quantity adjustment */}
            <div className='flex items-center border border-border/80 rounded-lg h-12 bg-white w-28 md:w-32 shadow-xs'>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className='text-gray-600 hover:text-primary w-full text-center text-xl font-bold cursor-pointer'
              >
                −
              </button>
              <span className='w-12 text-center font-bold text-sm text-foreground'>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className='text-gray-600 hover:text-primary w-full text-center text-xl font-bold cursor-pointer'
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className='px-6 h-12 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg min-w-[150px] shadow-md hover:opacity-95 transition-opacity cursor-pointer font-inter'
              style={{ backgroundColor: '#b85c6e' }}
            >
              Add To Cart
            </button>
          </div>

          <hr className='border-border/50 my-2' />

          {/* Product Specifications & Details Tabs */}
          <div className='text-xs md:text-sm text-slate-800 space-y-4 font-inter'>
            <div className='flex items-start gap-4'>
              <h4 className='w-28 md:w-36 font-semibold shrink-0 text-slate-600'>Brief Description</h4>
              <div className='flex-1'>
                <div className={`overflow-hidden transition-all duration-300 ${descExpanded ? 'max-h-[1000px]' : 'max-h-28'}`}>
                  <ul className='list-disc pl-4 space-y-1.5 text-muted-foreground leading-relaxed'>
                    <li><strong>Smooth Finish:</strong> Minimizes pores and fine lines for a silky base.</li>
                    <li><strong>Long-Lasting Makeup:</strong> Helps makeup stay fresh and in place throughout the day.</li>
                    <li><strong>Hydrating Formula:</strong> Keeps your skin moisturized and supple.</li>
                    <li><strong>Lightweight Texture:</strong> Feels comfortable on the skin without clogging pores.</li>
                    <li><strong>Oil Control:</strong> Reduces excess oil, perfect for a shine-free look.</li>
                    <li><strong>Even Skin Tone:</strong> Enhances natural radiance for a brighter complexion.</li>
                    <li><strong>Multipurpose Use:</strong> Suitable for all skin types and can be used alone or under makeup.</li>
                    <li><strong>Travel-Friendly Packaging:</strong> Compact and easy to carry for touch-ups anytime.</li>
                  </ul>
                  <p className='mt-3 text-muted-foreground font-semibold'>Country of Origin: P.R.C</p>
                  <p className='mt-2 text-primary font-bold'>* Online Exclusive Offer.</p>
                </div>
                <button
                  onClick={() => setDescExpanded(!descExpanded)}
                  className='text-primary hover:text-primary/80 font-bold mt-2 hover:underline cursor-pointer'
                >
                  {descExpanded ? 'Read Less...' : 'Read More...'}
                </button>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <h4 className='w-28 md:w-36 font-semibold text-slate-600'>SKU</h4>
              <p className='text-muted-foreground font-mono'>{productInfo.sku}</p>
            </div>

            <div className='flex items-center gap-4'>
              <h4 className='w-28 md:w-36 font-semibold text-slate-600'>Categories</h4>
              <p className='text-muted-foreground flex gap-1'>
                {['Makeup', 'Face', 'Face Primer'].map((cat, idx) => (
                  <span key={cat}>
                    <a href='#' className='hover:text-primary transition-colors font-medium underline-offset-2 hover:underline'>{cat}</a>
                    {idx < 2 && ','}
                  </span>
                ))}
              </p>
            </div>

            <div className='flex items-center gap-4'>
              <h4 className='w-28 md:w-36 font-semibold text-slate-600'>Brands</h4>
              <a href='#' className='hover:text-primary transition-colors font-medium underline-offset-2 hover:underline text-muted-foreground'>
                {productInfo.brand}
              </a>
            </div>
          </div>

          {/* Genuine Badges */}
          <div className='grid grid-cols-3 gap-3 border-t border-border pt-6 mt-2'>
            {[
              { icon: <Shield className='w-6 h-6 text-emerald-600' />, text: '100% Genuine Products' },
              { icon: <CreditCard className='w-6 h-6 text-blue-600' />, text: '100% Secure Payments' },
              { icon: <Headphones className='w-6 h-6 text-violet-600' />, text: 'Help Center (+8809666737475)' },
            ].map((badge, idx) => (
              <div key={idx} className='flex flex-col items-center gap-2 p-3 bg-secondary/20 rounded-xl border border-border/30 text-center font-inter'>
                {badge.icon}
                <h4 className='text-[10px] leading-tight font-bold text-slate-700'>{badge.text}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Frequently Bought Together & Available Offers Blocks */}
      <div className='flex flex-col-reverse lg:flex-row mt-16 justify-between gap-10 border-t border-border pt-12 font-inter'>
        {/* Left Section: Frequently Bought Together */}
        <div className='w-full lg:w-3/5'>
          <h3 className='text-base md:text-lg font-bold font-serif uppercase tracking-wider text-slate-800 mb-6'>
            Frequently Bought Together
          </h3>

          <div className='flex items-center gap-4 sm:gap-6 bg-slate-50 p-6 rounded-2xl border border-border/50 shadow-xs flex-wrap sm:flex-nowrap'>
            {/* Main Product Image */}
            <div className='w-24 h-24 bg-white rounded-xl border border-border/60 overflow-hidden shrink-0 shadow-sm flex items-center justify-center p-2'>
              <img src={productInfo.images[0]} alt={productInfo.name} className='w-full h-full object-contain' />
            </div>

            <div className='text-2xl font-bold text-slate-400 select-none shrink-0'>+</div>

            {/* Bundle Product Image */}
            <div className='w-24 h-24 bg-white rounded-xl border border-border/60 overflow-hidden shrink-0 shadow-sm flex items-center justify-center p-2'>
              <img src={bundleProduct.image} alt={bundleProduct.name} className='w-full h-full object-contain' />
            </div>

            {/* Bundle Details & Add to Cart button */}
            <div className='sm:ml-6 flex flex-col justify-center gap-2'>
              <p className='text-sm font-semibold text-slate-800'>
                Total Price: <span className='text-lg font-bold ml-1.5' style={{ color: '#b85c6e' }}>৳ 489.00</span>
              </p>
              <button
                onClick={handleAddBundle}
                className='px-6 py-2.5 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-opacity hover:opacity-90 shadow cursor-pointer font-inter'
                style={{ backgroundColor: '#b85c6e' }}
              >
                Add Both to Cart
              </button>
            </div>
          </div>

          {/* Bundle Line items */}
          <div className='mt-6 space-y-3.5'>
            {/* Primary Product item detail */}
            <div className='flex items-start text-xs sm:text-sm font-medium gap-2'>
              <div className='w-4.5 h-4.5 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mt-0.5 shrink-0'>
                <Check size={12} className='stroke-[3]' />
              </div>
              <span className='text-[#b85c6e] font-bold'>This Item:</span>
              <span className='text-slate-700'>{productInfo.name}</span>
              <span className='text-muted-foreground'>({productInfo.size})</span>
              <span className='line-through text-slate-400 ml-auto shrink-0'>৳{productInfo.originalPrice}</span>
              <span className='font-bold shrink-0 ml-2' style={{ color: '#b85c6e' }}>৳{productInfo.price}</span>
            </div>

            {/* Bundle Product item detail */}
            <div className='flex items-start text-xs sm:text-sm font-medium gap-2'>
              <div className='w-4.5 h-4.5 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mt-0.5 shrink-0'>
                <Check size={12} className='stroke-[3]' />
              </div>
              <span className='text-slate-700'>{bundleProduct.name}</span>
              <span className='line-through text-slate-400 ml-auto shrink-0'>৳{bundleProduct.originalPrice}</span>
              <span className='font-bold shrink-0 ml-2' style={{ color: '#b85c6e' }}>৳{bundleProduct.price}</span>
            </div>
          </div>
        </div>

        {/* Right Section: Available Offers slider */}
        <div className='w-full lg:w-2/5 flex flex-col'>
          <div className='flex justify-between items-center mb-6'>
            <h3 className='text-base md:text-lg font-bold font-serif uppercase tracking-wider text-slate-800'>
              Available Offers
            </h3>
            {/* Arrows */}
            <div className='flex gap-2'>
              <button
                onClick={prevOffer}
                className='w-7 h-7 rounded-full bg-slate-100 hover:bg-primary hover:text-white transition flex items-center justify-center text-slate-700 cursor-pointer shadow-xs border border-border/40'
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextOffer}
                className='w-7 h-7 rounded-full bg-slate-100 hover:bg-primary hover:text-white transition flex items-center justify-center text-slate-700 cursor-pointer shadow-xs border border-border/40'
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Active Offer Card */}
          <div className='offer-item relative rounded-2xl p-6 bg-rose-50/50 border border-primary/30 flex gap-4 overflow-hidden shadow-xs animate-in fade-in duration-300'>
            <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0'>
              <span className='text-2xl'>🎁</span>
            </div>
            <div className='flex-1 space-y-1'>
              <div className='flex justify-between items-center'>
                <h4 className='font-bold text-xs uppercase text-primary tracking-widest'>
                  {offers[offerIdx].title}
                </h4>
              </div>
              <h3 className='text-sm font-bold text-slate-800 leading-snug'>
                {offers[offerIdx].detail}
              </h3>
              <p className='text-xs text-slate-600 leading-relaxed pt-1'>
                {offers[offerIdx].description}
              </p>
              {offers[offerIdx].expiry && (
                <p className='text-[10px] text-muted-foreground pt-1.5 font-semibold'>
                  Expiry Date: {offers[offerIdx].expiry}
                </p>
              )}
            </div>
            {/* Top Cut */}
            <div className='absolute top-0 right-[40%] w-6 h-3 bg-white rounded-b-full border-b border-x border-primary/20' />
            {/* Bottom Cut */}
            <div className='absolute bottom-0 right-[40%] w-6 h-3 bg-white rounded-t-full border-t border-x border-primary/20' />
          </div>
          <span className='text-[10px] text-center text-muted-foreground mt-3 font-semibold'>
            Showing offer {offerIdx + 1} of {offers.length}
          </span>
        </div>
      </div>
    </div>
  );
}
