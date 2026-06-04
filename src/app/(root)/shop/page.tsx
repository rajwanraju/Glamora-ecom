'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MainLayout from '@components/layout/MainLayout';
import { ProductCard, Product } from '@components/shared/ProductCard';
import { Slider, Checkbox, Select } from 'antd';
import { Search, X } from 'lucide-react';

const mockProducts: (Product & { category: string })[] = [
  {
    id: 1,
    name: 'Hydra Boost Vitamin C Serum 30ml',
    brand: 'Dermatica',
    price: 1250,
    originalPrice: 1650,
    rating: 4.5,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1613803745799-ba6c10aace85?w=400&h=500&fit=crop&auto=format',
    badge: 'Bestseller',
    category: 'Skin',
  },
  {
    id: 2,
    name: 'Matte Velvet Lipstick — Rosewood',
    brand: 'Lakme',
    price: 480,
    originalPrice: 650,
    rating: 4,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=400&h=500&fit=crop&auto=format',
    badge: 'New',
    category: 'Makeup',
  },
  {
    id: 3,
    name: 'SPF 50+ Daily Sunscreen Fluid 50ml',
    brand: 'Minimalist',
    price: 890,
    originalPrice: 990,
    rating: 5,
    reviews: 521,
    image: 'https://images.unsplash.com/photo-1622910076411-b126ff7e469b?w=400&h=500&fit=crop&auto=format',
    category: 'Skin',
  },
  {
    id: 4,
    name: 'Nourishing Argan Oil Hair Mask 200ml',
    brand: 'Matrix',
    price: 740,
    originalPrice: 950,
    rating: 4.5,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=400&h=500&fit=crop&auto=format',
    badge: 'Sale',
    category: 'Hair',
  },
  {
    id: 5,
    name: 'Rose Water Toner with Hyaluronic Acid',
    brand: 'Plum',
    price: 545,
    originalPrice: 690,
    rating: 4,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1622018680711-9d8a97b4eb6c?w=400&h=500&fit=crop&auto=format',
    category: 'Skin',
  },
  {
    id: 6,
    name: 'Foundation Cushion SPF 30 — Ivory',
    brand: 'MAC',
    price: 2100,
    originalPrice: 2500,
    rating: 4.5,
    reviews: 267,
    image: 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=400&h=500&fit=crop&auto=format',
    badge: 'Popular',
    category: 'Makeup',
  },
  {
    id: 7,
    name: 'Deep Cleansing Foam Face Wash 150ml',
    brand: 'Neutrogena',
    price: 395,
    originalPrice: 480,
    rating: 4,
    reviews: 432,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=500&fit=crop&auto=format',
    category: 'Skin',
  },
  {
    id: 8,
    name: 'Body Butter Shea & Cocoa 250ml',
    brand: 'The Body Shop',
    price: 960,
    originalPrice: 1200,
    rating: 5,
    reviews: 384,
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400&h=500&fit=crop&auto=format',
    category: 'Body',
  },
  {
    id: 9,
    name: 'Retinol Night Repair Cream 50ml',
    brand: 'Olay',
    price: 1480,
    originalPrice: 1850,
    rating: 5,
    reviews: 643,
    image: 'https://images.unsplash.com/photo-1708477199100-e4d5f56a8eb2?w=400&h=500&fit=crop&auto=format',
    badge: 'Top Rated',
    category: 'Skin',
  },
  {
    id: 10,
    name: 'Waterproof Kajal — Intense Black',
    brand: 'Maybelline',
    price: 210,
    originalPrice: 260,
    rating: 4.5,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1542452255191-c85a98f2c5d1?w=400&h=500&fit=crop&auto=format',
    category: 'Makeup',
  },
  {
    id: 11,
    name: 'Repair & Protect Hair Serum 100ml',
    brand: 'Pantene',
    price: 630,
    originalPrice: 790,
    rating: 4,
    reviews: 327,
    image: 'https://images.unsplash.com/photo-1582616698198-f978da534162?w=400&h=500&fit=crop&auto=format',
    badge: 'Hot',
    category: 'Hair',
  },
  {
    id: 12,
    name: 'Brightening Face Pack with Turmeric',
    brand: 'Himalaya',
    price: 325,
    originalPrice: 420,
    rating: 4,
    reviews: 511,
    image: 'https://images.unsplash.com/photo-1598528738936-c50861cc75a9?w=400&h=500&fit=crop&auto=format',
    category: 'Skin',
  },
  {
    id: 13,
    name: 'Damage Repair Shampoo with Red Hibiscus',
    brand: 'Parachute',
    price: 99,
    originalPrice: 140,
    rating: 4,
    reviews: 250,
    image: 'https://bk.shajgoj.com/storage/2026/05/10728-1.jpg',
    badge: 'SALE',
    category: 'Hair',
  },
  {
    id: 14,
    name: 'Secrets Rosemary Hair Oil 200ml',
    brand: 'Parachute',
    price: 195,
    originalPrice: 240,
    rating: 4.5,
    reviews: 156,
    image: 'https://bk.shajgoj.com/storage/2026/06/31398.jpg',
    category: 'Hair',
  },
];

const categoryData = [
  { label: 'Free Delivery ⚡', count: 953, name: 'Free Delivery' },
  { label: 'Top Selling ⚡', count: 3035, name: 'Top Selling' },
  {
    label: 'Skin',
    count: 7223,
    name: 'Skin',
    subcategories: [
      { label: 'Skin care', count: 22, name: 'Skin care' },
    ],
  },
  { label: 'Personal care', count: 7067, name: 'Personal care', subcategories: [{ label: 'Personal Care', count: 10, name: 'Personal Care' }] },
  { label: 'Makeup', count: 6815, name: 'Makeup', subcategories: [{ label: 'Lipstick', count: 21, name: 'Lipstick' }] },
  { label: 'Natural', count: 5452, name: 'Natural' },
  {
    label: 'Hair',
    count: 3000,
    name: 'Hair',
    subcategories: [
      { label: 'Hair Care', count: 2430, name: 'Hair Care' },
      { label: 'Hair styling', count: 396, name: 'Hair styling' },
      { label: 'SHOP BY CONCERN', count: 1472, name: 'SHOP BY CONCERN' },
      { label: 'SHOP BY HAIR TYPE', count: 37, name: 'SHOP BY HAIR TYPE' },
      { label: 'Tools & Accessories', count: 169, name: 'Tools & Accessories' },
    ],
  },
  { label: 'Men', count: 2750, name: 'Men' },
  { label: 'Offers', count: 1202, name: 'Offers' },
  { label: 'Fragrance', count: 1168, name: 'Fragrance' },
  { label: 'Mom & Baby', count: 634, name: 'Mom & Baby' },
  { label: 'Combo', count: 534, name: 'Combo' },
  { label: 'Buy 1 Get 1', count: 476, name: 'Buy 1 Get 1' },
  { label: 'Clearance Sale', count: 355, name: 'Clearance Sale' },
];

const brandData = [
  { label: "L'Oreal", count: 257, value: "L'Oreal" },
  { label: 'Tresemme', count: 156, value: 'Tresemme' },
  { label: 'Pantene', count: 118, value: 'Pantene' },
  { label: 'Dove', count: 113, value: 'Dove' },
  { label: 'Sunsilk', count: 113, value: 'Sunsilk' },
  { label: 'Revlon', count: 107, value: 'Revlon' },
  { label: 'Herbal Essence', count: 84, value: 'Herbal Essence' },
  { label: 'Streax', count: 74, value: 'Streax' },
  { label: 'Head And Shoulders', count: 70, value: 'Head And Shoulders' },
  { label: 'Dermatica', count: 69, value: 'Dermatica' },
  { label: 'Plum', count: 68, value: 'Plum' },
  { label: 'Minimalist', count: 67, value: 'Minimalist' },
  { label: 'Parachute', count: 59, value: 'Parachute' },
  { label: 'skin cafe', count: 54, value: 'skin cafe' },
  { label: 'Schwarzkopf', count: 47, value: 'Schwarzkopf' },
];

function ShopPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 10000]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [brandSearchQuery, setBrandSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Handle URL Category Synced Click
  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    router.replace(`/shop?category=${categoryName}`);
  };

  const handleClearCategory = () => {
    setSelectedCategory('All');
    router.replace('/shop');
  };

  const handleBrandChange = (checkedValues: any) => {
    setSelectedBrands(checkedValues);
  };

  const handleRemoveBrandFilter = (brandToRemove: string) => {
    setSelectedBrands(prev => prev.filter(b => b !== brandToRemove));
  };

  const handleClearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedBrands([]);
    setPriceRange([10, 10000]);
    setSearchQuery('');
    router.replace('/shop');
  };

  // Filter products based on selected states
  const filteredProducts = mockProducts.filter((product) => {
    // 1. Category Filter
    if (selectedCategory !== 'All') {
      const matchParent = product.category.toLowerCase() === selectedCategory.toLowerCase();
      // Handle subcategories logic (mapping sub to parent category if needed)
      let matchSub = false;
      if (selectedCategory.toLowerCase() === 'hair care' || selectedCategory.toLowerCase() === 'hair styling') {
        matchSub = product.category.toLowerCase() === 'hair';
      }
      if (!matchParent && !matchSub) return false;
    }

    // 2. Brand Filter
    if (selectedBrands.length > 0) {
      const brandMatch = selectedBrands.some(
        (brand) => brand.toLowerCase() === product.brand.toLowerCase()
      );
      if (!brandMatch) return false;
    }

    // 3. Price Filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;

    // 4. Name/Brand Search Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      if (!matchName && !matchBrand) return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'rating_desc') return b.rating - a.rating;
    if (sortBy === 'reviews_desc') return b.reviews - a.reviews;
    return 0; // default (id)
  });

  // Filter Brand List by search query
  const filteredBrandsList = brandData.filter(brand =>
    brand.label.toLowerCase().includes(brandSearchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className='max-w-7xl mx-auto px-4 py-8 font-inter'>
        <div className='flex flex-col lg:flex-row gap-8'>
          
          {/* Sidebar Filters */}
          <div className='w-full lg:w-80 shrink-0 bg-white p-6 rounded-2xl border border-border shadow-sm h-fit space-y-8'>
            
            {/* Filter by Price */}
            <div>
              <h2 className='text-base font-bold uppercase tracking-wider text-slate-800 border-b border-border pb-3 mb-4 m-0'>
                Filter by Price
              </h2>
              <div className='px-1'>
                <Slider
                  range
                  min={10}
                  max={10000}
                  value={priceRange}
                  onChange={(val) => setPriceRange(val as [number, number])}
                  tooltip={{ formatter: (v) => `৳${v}` }}
                  className='custom-slider'
                />
                <div className='flex justify-between items-center mt-3 text-xs font-bold text-slate-700'>
                  <span>৳ {priceRange[0]}</span>
                  <span>৳ {priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Product Categories */}
            <div>
              <h2 className='text-base font-bold uppercase tracking-wider text-slate-800 border-b border-border pb-3 mb-4 m-0'>
                Product Categories
              </h2>
              <div className='max-h-72 overflow-y-auto pr-1 space-y-1.5 custom-scroll'>
                <ul className='list-none p-0 m-0 space-y-1.5'>
                  {/* All Categories reset option */}
                  <li>
                    <button
                      onClick={handleClearCategory}
                      className={`w-full text-left text-xs font-semibold py-1.5 px-3 rounded-lg border-0 bg-transparent cursor-pointer transition-colors ${
                        selectedCategory === 'All'
                          ? 'bg-primary/10 text-primary font-bold'
                          : 'text-slate-600 hover:text-primary hover:bg-secondary/35'
                      }`}
                    >
                      All Products
                    </button>
                  </li>
                  {categoryData.map((cat) => (
                    <li key={cat.label} className='space-y-1'>
                      <div className='flex items-center justify-between'>
                        <button
                          onClick={() => handleCategoryClick(cat.name)}
                          className={`flex-1 text-left text-xs font-semibold py-1.5 px-3 rounded-lg border-0 bg-transparent cursor-pointer transition-colors ${
                            selectedCategory.toLowerCase() === cat.name.toLowerCase()
                              ? 'bg-primary/10 text-primary font-bold'
                              : 'text-slate-600 hover:text-primary hover:bg-secondary/35'
                          }`}
                        >
                          <span className='mr-1'>{cat.label}</span>
                          <span className='text-[10px] text-muted-foreground font-normal'>({cat.count})</span>
                        </button>
                      </div>

                      {/* Subcategories (nested list) */}
                      {cat.subcategories && (
                        <ul className='list-none pl-6 pr-0 m-0 space-y-1 mt-1'>
                          {cat.subcategories.map((sub) => (
                            <li key={sub.label}>
                              <button
                                onClick={() => handleCategoryClick(sub.name)}
                                className={`w-full text-left text-[11px] font-semibold py-1 px-2.5 rounded-md border-0 bg-transparent cursor-pointer transition-colors ${
                                  selectedCategory.toLowerCase() === sub.name.toLowerCase()
                                    ? 'text-primary font-bold bg-primary/5'
                                    : 'text-slate-500 hover:text-primary hover:bg-secondary/20'
                                }`}
                              >
                                <span>{sub.label}</span>
                                <span className='text-[9px] text-slate-400 font-normal ml-1'>({sub.count})</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Filter by Brand */}
            <div>
              <h2 className='text-base font-bold uppercase tracking-wider text-slate-800 border-b border-border pb-3 mb-4 m-0'>
                Filter by Brand
              </h2>
              
              {/* Brand Search Box */}
              <div className='relative mb-4 flex items-center bg-secondary/50 rounded-lg border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-all'>
                <Search size={14} className='absolute left-3 text-muted-foreground' />
                <input
                  type='text'
                  placeholder='Search brand...'
                  value={brandSearchQuery}
                  onChange={(e) => setBrandSearchQuery(e.target.value)}
                  className='w-full pl-9 pr-3 py-1.5 text-xs bg-transparent border-0 outline-none text-foreground placeholder:text-slate-400 font-medium'
                />
              </div>

              <div className='max-h-60 overflow-y-auto pr-1 custom-scroll'>
                <Checkbox.Group
                  value={selectedBrands}
                  onChange={handleBrandChange}
                  className='flex flex-col gap-2 w-full font-semibold text-xs'
                >
                  {filteredBrandsList.map((brand) => (
                    <div key={brand.value} className='flex items-center justify-between w-full hover:bg-slate-50 py-0.5 rounded px-1'>
                      <Checkbox value={brand.value} className='text-xs text-slate-600 font-medium'>
                        {brand.label}
                      </Checkbox>
                      <span className='text-[10px] text-slate-400 font-normal'>({brand.count})</span>
                    </div>
                  ))}
                </Checkbox.Group>
              </div>
            </div>

            {/* Clear All Filters button */}
            {(selectedCategory !== 'All' || selectedBrands.length > 0 || priceRange[0] > 10 || priceRange[1] < 10000 || searchQuery !== '') && (
              <button
                onClick={handleClearAllFilters}
                className='w-full text-center py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer border-0'
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Main Products Grid & Header Controls */}
          <div className='flex-1 space-y-6'>
            
            {/* Products Page Header Search & Sorting */}
            <div className='flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-border shadow-sm'>
              {/* Live Search Bar */}
              <div className='w-full md:w-80 relative flex items-center bg-secondary/50 rounded-full border border-transparent focus-within:border-primary/40 focus-within:bg-white transition-all duration-300'>
                <Search size={16} className='absolute left-4 text-muted-foreground' />
                <input
                  type='text'
                  placeholder='Search here...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full pl-10 pr-4 py-2 text-xs bg-transparent border-0 outline-none text-foreground placeholder:text-slate-400 font-medium rounded-full'
                />
              </div>

              {/* Sorting selector */}
              <div className='w-full md:w-auto flex items-center justify-end gap-2 shrink-0'>
                <span className='text-xs font-bold text-slate-500 uppercase tracking-wider'>Sort By:</span>
                <Select
                  value={sortBy}
                  onChange={(val) => setSortBy(val)}
                  options={[
                    { value: 'default', label: 'Default sorting' },
                    { value: 'price_asc', label: 'Price: Low to High' },
                    { value: 'price_desc', label: 'Price: High to Low' },
                    { value: 'rating_desc', label: 'Rating: Highest Rated' },
                    { value: 'reviews_desc', label: 'Popularity: Most Reviewed' },
                  ]}
                  className='w-48 text-xs font-semibold custom-select'
                />
              </div>
            </div>

            {/* Active Refinements tags line */}
            {(selectedCategory !== 'All' || selectedBrands.length > 0) && (
              <div className='flex flex-wrap gap-2 items-center'>
                <span className='text-xs font-bold text-slate-500 uppercase tracking-wider mr-1'>Active Filters:</span>
                
                {/* Category Refinement tag */}
                {selectedCategory !== 'All' && (
                  <span className='inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20'>
                    <span>Category: {selectedCategory}</span>
                    <button
                      onClick={handleClearCategory}
                      className='hover:bg-primary/25 rounded-full p-0.5 border-0 bg-transparent cursor-pointer flex items-center justify-center'
                    >
                      <X size={10} className='stroke-[3]' />
                    </button>
                  </span>
                )}

                {/* Brands Refinement tags */}
                {selectedBrands.map((brand) => (
                  <span
                    key={brand}
                    className='inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20'
                  >
                    <span>Brand: {brand}</span>
                    <button
                      onClick={() => handleRemoveBrandFilter(brand)}
                      className='hover:bg-primary/25 rounded-full p-0.5 border-0 bg-transparent cursor-pointer flex items-center justify-center'
                    >
                      <X size={10} className='stroke-[3]' />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Products List Grid */}
            {sortedProducts.length > 0 ? (
              <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {sortedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-border/80 p-8'>
                <div className='w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4 border border-slate-100 shadow-inner'>
                  <Search size={36} />
                </div>
                <h4 className='text-base font-bold text-slate-700 m-0'>No Products Found</h4>
                <p className='text-xs text-muted-foreground mt-1.5 max-w-[280px] leading-relaxed font-semibold'>
                  No products matched your filters. Try adjusting your price range, clearing active categories, or searching with another keyword.
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className='mt-6 px-8 py-2.5 text-xs tracking-widest font-bold text-white rounded-full uppercase hover:bg-slate-800 transition-colors bg-slate-950 border-0 cursor-pointer font-inter'
                >
                  Clear All Filters
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </MainLayout>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <MainLayout>
        <div className='flex items-center justify-center py-40'>
          <div className='animate-pulse text-lg font-bold text-primary uppercase tracking-widest'>Loading Shop...</div>
        </div>
      </MainLayout>
    }>
      <ShopPageContent />
    </Suspense>
  );
}
