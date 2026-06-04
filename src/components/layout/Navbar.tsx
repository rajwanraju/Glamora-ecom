'use client';

import { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X, ChevronDown, Plus, Minus, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/index';
import { AuthType, setUserLogout } from '@store/slices/authSlice';
import { updateQuantity, removeItem } from '@store/slices/cartSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const navLinks = [
  { label: 'Skincare', sub: ['Face Wash', 'Moisturizer', 'Serum', 'Sunscreen'] },
  { label: 'Makeup', sub: ['Lips', 'Eyes', 'Face', 'Nails'] },
  { label: 'Haircare', sub: ['Shampoo', 'Conditioner', 'Hair Oil', 'Mask'] },
  { label: 'Body', sub: ['Body Lotion', 'Scrub', 'Deodorant'] },
  { label: 'Brands', sub: [] },
  { label: 'Offers', sub: [] },
];

const topBrands = ['Maybelline', 'Lakme', "L'Oréal", 'MAC', 'Neutrogena', 'The Body Shop'];
const allBrands = [
  'Maybelline', 'Lakme', "L'Oréal", 'MAC', 'Neutrogena',
  'The Body Shop', 'Plum', 'Minimalist', 'Olay', 'Himalaya',
  'Vaseline', 'Cetaphil', 'Nivea', 'Tresemme', 'Ponds'
];

export default function Navbar() {
  const { isLoggedUser, userAuthData }: AuthType = useSelector((state: RootState) => state.auth);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleLogout = () => {
    dispatch(setUserLogout());
    router.push('/login');
  };

  return (
    <>
      {/* Sticky Double-Row Header */}
      <header className='sticky top-0 z-50 bg-white border-b border-border shadow-sm w-full font-inter'>
        {/* Row 1: Logo, Search, User actions */}
        <div className='max-w-7xl mx-auto px-4 flex items-center justify-between h-18 gap-4 py-2'>
          {/* Hamburger (Mobile) */}
          <button
            className='lg:hidden p-2 text-foreground hover:text-primary transition-colors cursor-pointer'
            onClick={() => setMobileOpen(true)}
            aria-label='Toggle Menu'
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link
            href='/'
            className='flex items-center gap-1 shrink-0'
          >
            <span
              className='text-3xl font-bold tracking-tight'
              style={{ fontFamily: "'Playfair Display', serif", color: '#b85c6e', fontStyle: 'italic' }}
            >
              Glamora
            </span>
          </Link>

          {/* Search bar (Center) */}
          <div className='hidden md:flex flex-1 max-w-xl mx-4 relative items-center bg-secondary/50 rounded-full border border-transparent focus-within:border-primary/40 focus-within:bg-white transition-all duration-300'>
            <Search size={18} className='absolute left-4 text-muted-foreground' />
            <input
              type='text'
              placeholder='Search authentic beauty products...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-11 pr-4 py-2.5 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground/70 rounded-full border-0'
            />
          </div>

          {/* Right Action Buttons: Shajgoj Pill Style */}
          <div className='flex items-center gap-2 md:gap-3'>
            {/* Wishlist Button Pill */}
            <Link
              href='/product'
              className='hidden lg:flex items-center justify-center bg-slate-950 text-white text-xs font-bold py-2.5 px-4 rounded-full tracking-wide hover:bg-slate-800 transition-colors'
            >
              WISHLIST
            </Link>

            {/* Login/Logout Button Pill */}
            {isLoggedUser ? (
              <button
                onClick={handleLogout}
                className='hidden sm:flex items-center justify-center bg-secondary/80 text-foreground text-xs font-semibold py-2.5 px-4 rounded-full tracking-wide hover:bg-muted hover:text-primary transition-colors cursor-pointer'
              >
                LOGOUT
              </button>
            ) : (
              <Link
                href='/login'
                className='hidden sm:flex items-center justify-center bg-secondary/80 text-foreground text-xs font-semibold py-2.5 px-4 rounded-full tracking-wide hover:bg-muted hover:text-primary transition-colors'
              >
                LOGIN
              </Link>
            )}

            {/* Bag Button Pill */}
            <button
              onClick={() => setCartOpen(true)}
              className='flex items-center gap-2 text-xs font-bold py-2.5 px-4 rounded-full tracking-wide text-white transition-opacity hover:opacity-90 shadow-sm cursor-pointer'
              style={{ backgroundColor: '#b85c6e' }}
            >
              <ShoppingBag size={15} />
              <span className='hidden xs:inline'>BAG</span>
              <span className='inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-[#b85c6e] bg-white rounded-full ml-0.5'>
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Separator line */}
        <hr className='border-border/60 m-0' />

        {/* Row 2: Category Nav Links & Mega Menu */}
        <div className='hidden lg:block max-w-7xl mx-auto px-4'>
          <nav className='flex items-center justify-center gap-2 relative'>
            {navLinks.map((link) => (
              <div
                key={link.label}
                className='static group'
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => router.push(`/shop?category=${link.label}`)}
                  className='flex items-center gap-1 px-5 py-4 text-sm font-semibold uppercase tracking-wider text-foreground hover:text-primary transition-colors cursor-pointer border-0 bg-transparent'
                >
                  {link.label}
                  {link.label !== 'Brands' && link.label !== 'Offers' && <ChevronDown size={14} />}
                </button>

                {/* Subcategory Normal Dropdown */}
                {link.sub.length > 0 && link.label !== 'Brands' && activeDropdown === link.label && (
                  <div className='absolute left-1/2 -translate-x-1/2 top-full bg-white border border-border rounded-b-xl shadow-xl py-4 grid grid-cols-2 gap-x-8 gap-y-2 px-8 min-w-[340px] z-50 animate-in fade-in slide-in-from-top-2 duration-200'>
                    {link.sub.map((s) => (
                      <Link
                        key={s}
                        href={`/shop?category=${s}`}
                        className='block py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium'
                      >
                        {s}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Brands Full-Width Mega Dropdown */}
                {link.label === 'Brands' && activeDropdown === 'Brands' && (
                  <div className='absolute left-0 right-0 top-full w-full bg-white border-b border-border shadow-xl z-50 py-8 px-6 grid grid-cols-4 gap-8 animate-in fade-in slide-in-from-top-2 duration-200'>
                    {/* Left Column: Top Brands Title */}
                    <div className='border-r border-border/55 pr-4'>
                      <h4 className='text-sm font-bold tracking-wider text-slate-800 uppercase border-b border-border pb-2 mb-3'>
                        Top Brands
                      </h4>
                      <ul className='space-y-2 list-none p-0'>
                        {topBrands.map((brand) => (
                          <li key={brand}>
                            <Link href={`/shop`} className='text-sm text-muted-foreground hover:text-primary font-medium transition-colors block py-0.5'>
                              {brand}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Middle Columns: All Brands Grid */}
                    <div className='col-span-2'>
                      <h4 className='text-sm font-bold tracking-wider text-slate-800 uppercase border-b border-border pb-2 mb-3'>
                        All Brands
                      </h4>
                      <div className='grid grid-cols-3 gap-y-2 gap-x-4'>
                        {allBrands.map((brand) => (
                          <Link
                            key={brand}
                            href={`/shop`}
                            className='text-sm text-muted-foreground hover:text-primary font-medium transition-colors block py-0.5'
                          >
                            {brand}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Featured Banner */}
                    <div className='bg-secondary/40 rounded-2xl p-5 flex flex-col justify-between border border-border/50'>
                      <div>
                        <span className='text-[10px] font-bold tracking-widest text-[#b85c6e] uppercase'>Featured Offer</span>
                        <h4 className='font-serif font-bold text-lg text-foreground mt-1 leading-snug'>Korean Skincare Fest</h4>
                        <p className='text-xs text-muted-foreground mt-1.5 leading-relaxed font-medium'>
                          Enjoy up to 25% off on COSRX, Beauty of Joseon, & Anua!
                        </p>
                      </div>
                      <Link
                        href='/shop'
                        className='inline-flex items-center justify-center text-xs font-bold text-white px-4 py-2 mt-4 rounded-full transition-opacity hover:opacity-90 text-center w-full'
                        style={{ backgroundColor: '#b85c6e' }}
                      >
                        Shop Brand Deals
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Mobile Search input bar */}
        <div className='md:hidden px-4 pb-3 pt-1'>
          <div className='flex items-center relative bg-secondary/50 rounded-full border border-transparent focus-within:border-primary/40 focus-within:bg-white transition-all duration-300'>
            <Search size={16} className='absolute left-4 text-muted-foreground' />
            <input
              type='text'
              placeholder='Search beauty products...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-4 py-2 text-xs bg-transparent outline-none text-foreground placeholder:text-muted-foreground/70 rounded-full border-0'
            />
          </div>
        </div>
      </header>

      {/* Floating Mini Cart Button (Shajgoj-style) */}
      <button
        onClick={() => setCartOpen(true)}
        className='hidden md:flex flex-col fixed right-0 top-[45%] border-t border-l border-b border-primary/45 rounded-l-xl text-white shadow-xl z-[101] min-w-[70px] overflow-hidden group hover:-translate-x-1 transition-transform cursor-pointer'
        style={{ borderColor: '#b85c6e' }}
      >
        {/* Top Half: Dark gray background */}
        <div className='bg-slate-900 flex flex-col text-center px-1.5 pt-2.5 pb-1.5 items-center w-full group-hover:bg-slate-800 transition-colors'>
          <ShoppingBag size={20} className='mb-1 text-white' />
          <span className='text-sm font-bold leading-none'>{cartCount}</span>
          <span className='text-[9px] font-bold tracking-wider mt-0.5 text-slate-400'>ITEMS</span>
        </div>
        {/* Bottom Half: Brand color background */}
        <div className='text-center text-xs font-bold px-1 py-1.5 w-full flex items-center justify-center gap-0.5' style={{ backgroundColor: '#b85c6e' }}>
          <span>৳{cartSubtotal.toLocaleString()}</span>
        </div>
      </button>

      {/* Mobile Drawer (Left-Side Navigation) */}
      {mobileOpen && (
        <div className='fixed inset-0 z-[120] flex'>
          {/* Backdrop */}
          <div className='fixed inset-0 bg-black/50 backdrop-blur-xs' onClick={() => setMobileOpen(false)} />

          {/* Drawer content */}
          <div className='relative flex flex-col w-80 max-w-xs h-full bg-white text-foreground shadow-2xl animate-in slide-in-from-left duration-300 z-[121]'>
            <div className='flex justify-between items-center p-4 border-b border-border shadow-xs'>
              <span
                className='text-2xl font-bold tracking-tight'
                style={{ fontFamily: "'Playfair Display', serif", color: '#b85c6e', fontStyle: 'italic' }}
              >
                Glamora
              </span>
              <button onClick={() => setMobileOpen(false)} className='p-2 hover:text-primary transition-colors cursor-pointer border-0 bg-transparent'>
                <X size={22} />
              </button>
            </div>

            {/* User Profile Bar */}
            <div className='p-5 bg-secondary/30 flex items-center gap-3 border-b border-border'>
              <div className='w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0' style={{ backgroundColor: '#b85c6e' }}>
                <User size={18} />
              </div>
              <div className='min-w-0'>
                {isLoggedUser ? (
                  <>
                    <span className='text-sm font-bold hover:text-primary transition-colors block truncate'>Welcome {userAuthData?.firstName ?? 'User'}</span>
                    <button onClick={handleLogout} className='text-xs text-muted-foreground hover:underline p-0 border-0 bg-transparent text-left font-semibold cursor-pointer'>Logout</button>
                  </>
                ) : (
                  <>
                    <span className='text-sm font-bold hover:text-primary transition-colors block'>Welcome User</span>
                    <Link href='/login' className='text-xs text-muted-foreground hover:underline font-semibold' onClick={() => setMobileOpen(false)}>Login or Register</Link>
                  </>
                )}
              </div>
            </div>

            {/* Nav list */}
            <div className='flex-1 overflow-y-auto py-4 px-2 space-y-1'>
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.sub.length > 0 ? (
                    <details className='group'>
                      <summary className='flex items-center justify-between px-4 py-3 text-sm font-semibold uppercase tracking-wider text-foreground hover:text-primary transition-colors cursor-pointer list-none'>
                        {link.label}
                        <ChevronDown size={16} className='group-open:rotate-180 transition-transform' />
                      </summary>
                      <div className='pl-6 pr-4 pb-2 space-y-1'>
                        {link.sub.map((s) => (
                          <Link
                            key={s}
                            href={`/shop?category=${s}`}
                            className='block py-2 text-sm text-muted-foreground hover:text-primary transition-colors'
                            onClick={() => setMobileOpen(false)}
                          >
                            {s}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={`/shop?category=${link.label}`}
                      className='block px-4 py-3 text-sm font-semibold uppercase tracking-wider text-foreground hover:text-primary transition-colors'
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Footer menu */}
            <div className='p-4 border-t border-border grid grid-cols-2 gap-2'>
              <Link href='/shop' className='flex items-center justify-center bg-slate-950 text-white text-xs font-bold py-2.5 px-3 rounded-full hover:bg-slate-800 transition-colors text-center' onClick={() => setMobileOpen(false)}>
                WISHLIST
              </Link>
              {isLoggedUser ? (
                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className='flex items-center justify-center bg-secondary/80 text-foreground text-xs font-bold py-2.5 px-3 rounded-full hover:bg-muted hover:text-primary transition-colors text-center cursor-pointer border-0'>
                  LOGOUT
                </button>
              ) : (
                <Link href='/login' className='flex items-center justify-center bg-secondary/80 text-foreground text-xs font-bold py-2.5 px-3 rounded-full hover:bg-muted hover:text-primary transition-colors text-center' onClick={() => setMobileOpen(false)}>
                  LOGIN
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Right-Side Shopping Cart Drawer */}
      {cartOpen && (
        <div className='fixed inset-0 z-[120] flex justify-end font-inter'>
          {/* Backdrop */}
          <div className='fixed inset-0 bg-black/50 backdrop-blur-xs' onClick={() => setCartOpen(false)} />

          {/* Drawer content */}
          <div className='relative flex flex-col w-full max-w-md h-full bg-white text-foreground shadow-2xl animate-in slide-in-from-right duration-300 z-[121]'>
            {/* Header */}
            <div className='flex items-center justify-between p-4 border-b border-border bg-slate-50'>
              <div className='flex items-center gap-2'>
                <ShoppingBag size={20} style={{ color: '#b85c6e' }} />
                <h4 className='text-base font-bold uppercase tracking-wider text-slate-800 m-0'>Your Shopping Bag</h4>
                <span className='bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-bold ml-1'>
                  {cartCount}
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className='p-2 hover:text-primary transition-colors rounded-full hover:bg-slate-100 cursor-pointer border-0 bg-transparent'
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart items list */}
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className='flex gap-4 border-b border-border/50 pb-4 last:border-0 last:pb-0 items-start'>
                    {/* Image */}
                    <div className='w-20 h-20 bg-secondary rounded-lg overflow-hidden shrink-0 border border-border/60 relative'>
                      <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                    </div>

                    {/* Info */}
                    <div className='flex-1 min-w-0'>
                      <span className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider block'>
                        {item.brand}
                      </span>
                      <h5 className='text-sm font-semibold text-foreground leading-snug truncate m-0'>
                        {item.name}
                      </h5>
                      <span className='text-sm font-bold mt-1 block' style={{ color: '#b85c6e' }}>
                        ৳{item.price.toLocaleString()}
                      </span>

                      {/* Quantity Controls */}
                      <div className='flex items-center justify-between mt-2.5'>
                        <div className='flex items-center border border-border/80 rounded-md'>
                          <button
                            onClick={() => dispatch(updateQuantity({ id: item.id, delta: -1 }))}
                            className='p-1 hover:bg-slate-100 hover:text-primary transition-colors text-muted-foreground cursor-pointer border-0 bg-transparent'
                          >
                            <Minus size={14} />
                          </button>
                          <span className='text-xs font-bold px-3 text-foreground'>{item.quantity}</span>
                          <button
                            onClick={() => dispatch(updateQuantity({ id: item.id, delta: 1 }))}
                            className='p-1 hover:bg-slate-100 hover:text-primary transition-colors text-muted-foreground cursor-pointer border-0 bg-transparent'
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Remove item button */}
                        <button
                          onClick={() => dispatch(removeItem(item.id))}
                          className='text-muted-foreground hover:text-red-500 transition-colors p-1 cursor-pointer border-0 bg-transparent'
                          aria-label='Remove item'
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='flex flex-col items-center justify-center py-20 text-center'>
                  <div className='w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-muted-foreground mb-4 shadow-inner'>
                    <ShoppingBag size={36} />
                  </div>
                  <h4 className='text-base font-bold text-slate-700 m-0'>Your Shopping Bag is Empty</h4>
                  <p className='text-xs text-muted-foreground mt-1.5 max-w-[200px] leading-relaxed font-medium'>
                    Browse our top categories and add some authentic beauty items.
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className='mt-6 px-8 py-2.5 text-xs tracking-widest font-bold text-white rounded-full uppercase hover:bg-slate-800 transition-colors bg-slate-950 border-0 cursor-pointer font-inter'
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Bottom calculation and CTA */}
            {cartItems.length > 0 && (
              <div className='p-4 border-t border-border bg-slate-50 space-y-4'>
                <div className='flex justify-between items-center text-sm font-semibold'>
                  <span className='text-slate-600'>Subtotal</span>
                  <span className='text-lg font-bold' style={{ color: '#b85c6e' }}>
                    ৳{cartSubtotal.toLocaleString()}
                  </span>
                </div>
                <div className='flex justify-between items-center text-[10px] text-muted-foreground bg-white p-2.5 rounded-lg border border-border/40 font-semibold'>
                  <span>Standard Shipping</span>
                  <span className='font-bold text-green-600'>FREE</span>
                </div>
                <button
                  className='w-full text-center py-3 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-opacity hover:opacity-90 shadow-md cursor-pointer border-0 font-inter'
                  style={{ backgroundColor: '#b85c6e' }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
