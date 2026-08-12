import React from 'react';
import { Star, Eye, ShoppingBag, Heart } from 'lucide-react';
import { SneakerProduct } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: SneakerProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart, wishlist, toggleWishlist } = useShop();
  const isFavorite = wishlist.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first available size and first color
    addToCart(product, product.sizes[0] || 9, product.colors[0], 1);
  };

  return (
    <div
      onClick={() => navigateTo('product-details', product.id)}
      className="group relative bg-white/5 border border-white/10 hover:border-[#E10600] transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* BADGES & WISHLIST */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-[#E10600] text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-white text-black text-[10px] font-bold uppercase tracking-widest px-2 py-0.5">
              TOP DROP
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`p-1.5 transition-all ${
            isFavorite
              ? 'bg-[#E10600] text-white'
              : 'bg-black/80 text-white/60 hover:text-white'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* PRODUCT IMAGE SHOWCASE */}
      <div className="relative aspect-[4/3] bg-black/40 p-6 flex items-center justify-center overflow-hidden border-b border-white/5">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out filter drop-shadow-xl"
        />
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] text-white/50 font-mono tracking-widest">
          <span className="uppercase text-[#E10600] font-bold">{product.category}</span>
          <span className="flex items-center gap-1 text-white/80 font-bold bg-black/80 px-2 py-0.5 border border-white/10">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {product.rating}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white uppercase tracking-tight group-hover:text-[#E10600] transition-colors">
            {product.name}
          </h3>
          <p className="text-white/50 text-xs line-clamp-2 leading-relaxed">{product.tagline}</p>
        </div>

        {/* COLOR SWATCHES & PRICE */}
        <div className="space-y-3 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between">
            {/* Color Swatches */}
            <div className="flex items-center space-x-1.5">
              {product.colors.map((color, idx) => (
                <span
                  key={idx}
                  className={`w-3 h-3 rounded-full ${color.bgClass} inline-block border border-white/20`}
                  title={color.name}
                />
              ))}
            </div>

            {/* Price */}
            <div className="text-right">
              {product.originalPrice && (
                <span className="text-xs text-white/40 line-through mr-1.5 font-mono">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-sm font-bold text-white font-mono">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* BUTTON ACTIONS */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => navigateTo('product-details', product.id)}
              className="w-full border border-white/20 hover:bg-white hover:text-black text-white font-bold py-2 px-2 text-[10px] uppercase tracking-widest flex items-center justify-center gap-1 transition-all"
            >
              <Eye className="w-3 h-3" /> DETAILS
            </button>
            <button
              onClick={handleQuickAdd}
              className="w-full bg-[#E10600] hover:bg-[#A80000] text-white font-bold py-2 px-2 text-[10px] uppercase tracking-widest flex items-center justify-center gap-1 transition-all"
            >
              <ShoppingBag className="w-3 h-3" /> ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
