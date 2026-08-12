import React, { useState, useMemo } from 'react';
import { Category, PriceRange, SortOption } from '../types';
import { SNEAKER_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, Search, RotateCcw } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange>('all');
  const [selectedSort, setSelectedSort] = useState<SortOption>('featured');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const categories: Category[] = ['All', 'Running', 'Lifestyle', 'Basketball', 'Training'];

  const priceRanges: { label: string; value: PriceRange }[] = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₹10,000', value: 'under-10k' },
    { label: '₹10,000 – ₹15,000', value: '10k-15k' },
    { label: 'Above ₹15,000', value: 'above-15k' },
  ];

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: 'Featured Drops', value: 'featured' },
    { label: 'Newest Arrivals', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Highest Rated', value: 'rating' },
  ];

  // Filter & Sort Logic
  const processedProducts = useMemo(() => {
    return SNEAKER_PRODUCTS.filter((product) => {
      // Category Filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Price Filter
      if (selectedPriceRange === 'under-10k' && product.price >= 10000) return false;
      if (
        selectedPriceRange === '10k-15k' &&
        (product.price < 10000 || product.price > 15000)
      )
        return false;
      if (selectedPriceRange === 'above-15k' && product.price <= 15000) return false;

      // Search Filter
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesTag = product.tagline.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesTag && !matchesCategory) return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-asc') return a.price - b.price;
      if (selectedSort === 'price-desc') return b.price - a.price;
      if (selectedSort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (selectedSort === 'rating') return b.rating - a.rating;
      // Default: featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, selectedPriceRange, selectedSort, searchFilter]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedPriceRange !== 'all' ||
    selectedSort !== 'featured' ||
    searchFilter !== '';

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedPriceRange('all');
    setSelectedSort('featured');
    setSearchFilter('');
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="border-b border-gray-800 pb-8 space-y-2">
          <span className="text-[#E10600] text-xs font-black uppercase tracking-widest block">
            NIKE ATHLETIC FOOTWEAR
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-sans">
            SHOP THE COLLECTION
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Find the pair built for your pace. Precision engineered for high impact and modern style.
          </p>
        </div>

        {/* FILTER & SORT CONTROLS BAR */}
        <div className="bg-[#121212] border border-gray-800 rounded-2xl p-4 sm:p-6 space-y-5">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black text-gray-400 uppercase tracking-wider mr-2 hidden sm:inline">
                CATEGORY:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#E10600] text-white shadow-lg shadow-red-600/30'
                      : 'bg-black/60 text-gray-300 hover:text-white border border-gray-800 hover:border-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown & Search Input */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter sneakers..."
                  className="w-full bg-black border border-gray-800 focus:border-[#E10600] text-white text-xs pl-9 pr-3 py-2.5 rounded-xl focus:outline-none"
                />
              </div>

              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as SortOption)}
                className="bg-black border border-gray-800 text-white text-xs font-bold uppercase px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#E10600] cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#121212] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SECOND ROW: PRICE RANGE & RESET */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-800/80 gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-gray-400 uppercase tracking-wider mr-2">PRICE RANGE:</span>
              {priceRanges.map((pr) => (
                <button
                  key={pr.value}
                  onClick={() => setSelectedPriceRange(pr.value)}
                  className={`px-3 py-1.5 rounded-lg font-bold text-[11px] uppercase transition-all ${
                    selectedPriceRange === pr.value
                      ? 'bg-red-950 text-[#E10600] border border-red-600/60 font-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {pr.label}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E10600] hover:text-white transition-colors uppercase"
              >
                <RotateCcw className="w-3.5 h-3.5" /> RESET ALL FILTERS
              </button>
            )}
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div className="flex items-center justify-between text-xs font-extrabold uppercase text-gray-400 tracking-wider">
          <span>
            SHOWING <span className="text-white font-black">{processedProducts.length}</span> OF{' '}
            {SNEAKER_PRODUCTS.length} SILHOUETTES
          </span>
          {selectedCategory !== 'All' && (
            <span className="text-[#E10600]">FILTERED BY: {selectedCategory.toUpperCase()}</span>
          )}
        </div>

        {/* PRODUCT GRID */}
        {processedProducts.length === 0 ? (
          <div className="bg-[#121212] border border-gray-800 rounded-2xl p-16 text-center space-y-4">
            <div className="w-16 h-16 bg-gray-900 border border-red-900/40 text-[#E10600] rounded-full flex items-center justify-center mx-auto">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white uppercase">NO SNEAKERS MATCH YOUR FILTERS</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              Try adjusting your price range, category selection, or search query to find available models.
            </p>
            <button
              onClick={resetFilters}
              className="bg-[#E10600] hover:bg-red-700 text-white font-extrabold px-6 py-3 rounded-xl uppercase text-xs tracking-widest transition-all inline-block mt-2"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
