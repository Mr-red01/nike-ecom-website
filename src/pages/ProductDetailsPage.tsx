import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SNEAKER_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Star, Shield, Truck, RefreshCw, ChevronDown, ChevronUp, ShoppingBag, Heart, ArrowLeft } from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const { selectedProductId, addToCart, navigateTo, wishlist, toggleWishlist } = useShop();

  const product = SNEAKER_PRODUCTS.find((p) => p.id === selectedProductId) || SNEAKER_PRODUCTS[0];

  const [activeImage, setActiveImage] = useState<string>(product.gallery[0] || product.image);
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0] || 9);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<'details' | 'materials' | 'shipping' | 'sizeguide' | null>('details');

  const toggleAccordion = (section: 'details' | 'materials' | 'shipping' | 'sizeguide') => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const isFavorite = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigateTo('cart');
  };

  const relatedProducts = SNEAKER_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* BACK TO SHOP LINK */}
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO ALL SNEAKERS
        </button>

        {/* MAIN PRODUCT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: IMAGE GALLERY */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square sm:aspect-[4/3] bg-gradient-to-b from-[#161616] to-[#0A0A0A] rounded-2xl border border-gray-800 p-8 flex items-center justify-center overflow-hidden shadow-2xl">
              <span className="absolute top-4 left-4 bg-[#E10600] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest shadow-md">
                {product.category}
              </span>

              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(225,6,0,0.25)] transition-all duration-300 transform hover:scale-105"
              />
            </div>

            {/* THUMBNAIL SELECTOR */}
            <div className="grid grid-cols-4 gap-3">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`aspect-square bg-gray-900 border-2 rounded-xl p-2 overflow-hidden transition-all ${
                    activeImage === imgUrl ? 'border-[#E10600] ring-2 ring-[#E10600]/30' : 'border-gray-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: PRODUCT SPECIFICATIONS & ACTIONS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2 border-b border-gray-800 pb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#E10600] tracking-widest uppercase">
                  NIKE PERFORMANCE 2026
                </span>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2 rounded-full border transition-all ${
                    isFavorite
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-black text-gray-400 border-gray-800 hover:text-white'
                  }`}
                  title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
                </button>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
                {product.name}
              </h1>

              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-white">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through font-medium">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-2.5 py-0.5 rounded-full ml-auto">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400 font-normal">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed pt-2">{product.description}</p>
            </div>

            {/* COLOR OPTIONS */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-300 uppercase tracking-wider block">
                COLOR: <span className="text-white">{selectedColor.name}</span>
              </label>
              <div className="flex items-center gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                      selectedColor.name === color.name
                        ? 'border-[#E10600] bg-red-950/40 text-white'
                        : 'border-gray-800 bg-black text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${color.bgClass}`} />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* SIZE SELECTOR */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-black text-gray-300 uppercase tracking-wider">
                  SELECT SIZE (UK/INDIA):
                </label>
                <button
                  onClick={() => toggleAccordion('sizeguide')}
                  className="text-[#E10600] font-bold hover:underline"
                >
                  SIZE GUIDE
                </button>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-xl font-black text-xs transition-all ${
                      selectedSize === size
                        ? 'bg-[#E10600] text-white shadow-md shadow-red-600/30'
                        : 'bg-black text-gray-300 border border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY & BUTTONS */}
            <div className="space-y-3 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">QTY:</span>
                <div className="flex items-center bg-black border border-gray-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-400 hover:text-white font-black"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-black text-sm text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-400 hover:text-white font-black"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="bg-[#E10600] hover:bg-red-700 text-white font-extrabold py-4 px-6 rounded-xl uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-600/30"
                  id="add-to-cart-btn"
                >
                  <ShoppingBag className="w-4 h-4" /> ADD TO CART
                </button>
                <button
                  onClick={handleBuyNow}
                  className="bg-white hover:bg-gray-200 text-black font-extrabold py-4 px-6 rounded-xl uppercase text-xs tracking-widest transition-all shadow-xl"
                  id="buy-now-btn"
                >
                  BUY NOW
                </button>
              </div>
            </div>

            {/* SERVICE PROMISES */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-800 text-[11px] text-gray-400">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#E10600] shrink-0" />
                <span>Express Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-[#E10600] shrink-0" />
                <span>30-Day Free Returns</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#E10600] shrink-0" />
                <span>Original Authentic</span>
              </div>
            </div>

            {/* EXPANDABLE ACCORDIONS */}
            <div className="space-y-3 pt-6 border-t border-gray-800">
              {/* ACCORDION 1: PRODUCT DETAILS */}
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-[#121212]">
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-black text-white uppercase tracking-wider"
                >
                  <span>PRODUCT DETAILS</span>
                  {openAccordion === 'details' ? <ChevronUp className="w-4 h-4 text-[#E10600]" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'details' && (
                  <div className="p-4 pt-0 text-xs text-gray-300 space-y-2 border-t border-gray-800/60">
                    <ul className="list-disc list-inside space-y-1">
                      {product.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                    <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono text-gray-400 bg-black/40 p-2 rounded">
                      <span>Weight: {product.specifications.weight}</span>
                      <span>Drop: {product.specifications.drop}</span>
                      <span>Surface: {product.specifications.surface}</span>
                      <span>Cushion: {product.specifications.cushioning}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* ACCORDION 2: MATERIALS */}
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-[#121212]">
                <button
                  onClick={() => toggleAccordion('materials')}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-black text-white uppercase tracking-wider"
                >
                  <span>MATERIALS & SUSTAINABILITY</span>
                  {openAccordion === 'materials' ? <ChevronUp className="w-4 h-4 text-[#E10600]" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'materials' && (
                  <div className="p-4 pt-0 text-xs text-gray-300 space-y-1.5 border-t border-gray-800/60">
                    {product.materials.map((mat, idx) => (
                      <p key={idx}>• {mat}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* ACCORDION 3: SHIPPING & RETURNS */}
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-[#121212]">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-black text-white uppercase tracking-wider"
                >
                  <span>SHIPPING & RETURNS</span>
                  {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4 text-[#E10600]" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="p-4 pt-0 text-xs text-gray-300 space-y-2 border-t border-gray-800/60">
                    <p>Free standard shipping on all orders over ₹10,000. Delivered in 2–4 business days with live tracking.</p>
                    <p>Hassle-free 30-day return policy. Product must be unworn in original packaging.</p>
                  </div>
                )}
              </div>

              {/* ACCORDION 4: SIZE GUIDE */}
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-[#121212]">
                <button
                  onClick={() => toggleAccordion('sizeguide')}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-black text-white uppercase tracking-wider"
                >
                  <span>SIZE GUIDE</span>
                  {openAccordion === 'sizeguide' ? <ChevronUp className="w-4 h-4 text-[#E10600]" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'sizeguide' && (
                  <div className="p-4 pt-0 text-xs text-gray-300 border-t border-gray-800/60">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-800 text-gray-400 font-bold">
                          <th className="py-1">UK/IND</th>
                          <th className="py-1">US</th>
                          <th className="py-1">EUR</th>
                          <th className="py-1">CM</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800 font-mono text-[11px]">
                        <tr><td className="py-1">7</td><td>8</td><td>41</td><td>26.0</td></tr>
                        <tr><td className="py-1">8</td><td>9</td><td>42.5</td><td>27.0</td></tr>
                        <tr><td className="py-1">9</td><td>10</td><td>44</td><td>28.0</td></tr>
                        <tr><td className="py-1">10</td><td>11</td><td>45</td><td>29.0</td></tr>
                        <tr><td className="py-1">11</td><td>12</td><td>46</td><td>30.0</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-gray-800 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              MORE FROM {product.category.toUpperCase()}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
