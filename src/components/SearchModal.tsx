import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SNEAKER_PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = SNEAKER_PRODUCTS.filter((product) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.tagline.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md pt-20 px-4 animate-in fade-in duration-200">
      <div className="bg-[#121212] border border-gray-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl shadow-red-950/50">
        {/* HEADER INPUT */}
        <div className="p-4 sm:p-6 border-b border-gray-800 flex items-center gap-3">
          <Search className="w-6 h-6 text-[#E10600] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search NIKE sneakers, e.g. 'Air', 'Running'..."
            className="w-full bg-transparent text-white text-lg sm:text-xl font-bold focus:outline-none placeholder:text-gray-500 placeholder:font-normal"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-white text-xs uppercase font-extrabold px-2 py-1 bg-gray-800 rounded"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* RESULTS BODY */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            <span>{query ? `RESULTS FOR "${query.toUpperCase()}"` : 'TRENDING SILHOUETTES'}</span>
            <span>{filteredProducts.length} PRODUCTS FOUND</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 bg-gray-900 border border-red-900/40 text-red-500 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-[#E10600]" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase">No Sneakers Found</h3>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">
                We couldn't find any sneakers matching "{query}". Try searching for "Air Max", "Running", or "Basketball".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    navigateTo('product-details', product.id);
                    setIsSearchOpen(false);
                  }}
                  className="flex items-center gap-4 p-3 bg-gray-900/60 hover:bg-red-950/20 border border-gray-800 hover:border-[#E10600]/60 rounded-xl cursor-pointer group transition-all duration-200"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-lg bg-black shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-black tracking-widest text-[#E10600] uppercase block">
                      {product.category}
                    </span>
                    <h4 className="text-sm font-extrabold text-white truncate group-hover:text-[#E10600] transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-black text-white">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="flex items-center text-[11px] text-amber-400 font-semibold">
                        <Star className="w-3 h-3 fill-amber-400 inline mr-0.5" />
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#E10600] group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
