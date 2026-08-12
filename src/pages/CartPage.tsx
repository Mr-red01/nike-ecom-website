import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Plus, Minus } from 'lucide-react';
import { CheckoutModal } from '../components/CheckoutModal';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountPercentage,
    appliedPromo,
    applyPromo,
    removePromo,
    navigateTo,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const discountAmount = Math.round((subtotal * discountPercentage) / 100);
  const shippingFee = subtotal > 10000 || subtotal === 0 ? 0 : 499;
  const estimatedTax = Math.round(subtotal * 0.18); // 18% GST standard
  const finalTotal = subtotal - discountAmount + shippingFee + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const res = applyPromo(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* HEADER */}
        <div className="border-b border-gray-800 pb-6 flex items-center justify-between">
          <div>
            <span className="text-[#E10600] text-xs font-black uppercase tracking-widest block mb-1">
              NIKE ATHLETE BAG
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
              YOUR BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h1>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-extrabold uppercase text-[#E10600] hover:text-white transition-colors"
          >
            CONTINUE SHOPPING <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {cart.length === 0 ? (
          /* EMPTY CART STATE */
          <div className="bg-[#121212] border border-gray-800 rounded-2xl p-12 sm:p-20 text-center space-y-6 max-w-2xl mx-auto my-12 shadow-2xl">
            <div className="w-20 h-20 bg-gray-900 border border-red-900/40 text-[#E10600] rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white uppercase">YOUR BAG IS EMPTY</h2>
              <p className="text-gray-400 text-sm max-w-sm mx-auto">
                Once you select your favorite sneakers, they will appear here. Ready to find your pair?
              </p>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="bg-[#E10600] hover:bg-red-700 text-white font-extrabold px-8 py-4 rounded-xl uppercase text-xs tracking-widest transition-all shadow-xl shadow-red-600/30 inline-flex items-center gap-2"
            >
              SHOP COLLECTION <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* CART CONTENT GRID */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT: CART ITEMS LIST */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#121212] border border-gray-800 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-gray-700 transition-all"
                >
                  {/* PRODUCT IMAGE & INFO */}
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain bg-black rounded-xl p-2 border border-gray-800 shrink-0"
                    />
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#E10600]">
                        {item.product.category}
                      </span>
                      <h3
                        onClick={() => navigateTo('product-details', item.product.id)}
                        className="text-base sm:text-lg font-black text-white uppercase tracking-tight truncate cursor-pointer hover:text-[#E10600] transition-colors"
                      >
                        {item.product.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-medium">
                        <span>
                          Size: <strong className="text-white">{item.selectedSize}</strong>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          Color:{' '}
                          <span
                            className={`w-3 h-3 rounded-full ${item.selectedColor.bgClass} inline-block border border-gray-700`}
                          />
                          <strong className="text-white">{item.selectedColor.name}</strong>
                        </span>
                      </div>
                      <p className="text-sm font-black text-white pt-1">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* CONTROLS: QUANTITY & REMOVE */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-gray-800">
                    <div className="flex items-center bg-black border border-gray-800 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 font-black text-xs text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-950/40 rounded-lg transition-all"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="lg:col-span-4 bg-[#121212] border border-gray-800 rounded-2xl p-6 space-y-6 shadow-2xl sticky top-28">
              <h2 className="text-xl font-black text-white uppercase tracking-wider border-b border-gray-800 pb-4">
                ORDER SUMMARY
              </h2>

              {/* PROMO CODE INPUT */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  PROMO CODE
                </label>
                {appliedPromo ? (
                  <div className="bg-red-950/60 border border-red-600/60 p-3 rounded-xl flex items-center justify-between text-xs">
                    <span className="font-extrabold text-white flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#E10600]" /> {appliedPromo} ({discountPercentage}% OFF)
                    </span>
                    <button
                      onClick={removePromo}
                      className="text-[#E10600] hover:text-white font-bold underline uppercase text-[10px]"
                    >
                      REMOVE
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Try 'NIKE2026'"
                      className="flex-1 bg-black border border-gray-800 focus:border-[#E10600] rounded-xl px-3 py-2 text-xs text-white focus:outline-none uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="bg-gray-800 hover:bg-[#E10600] text-white font-extrabold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-colors shrink-0"
                    >
                      APPLY
                    </button>
                  </form>
                )}
                {promoError && <p className="text-[11px] text-red-500 font-bold">{promoError}</p>}
              </div>

              {/* CALCULATION BREAKDOWN */}
              <div className="space-y-3 text-xs text-gray-300 pt-2 border-t border-gray-800/80">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#E10600] font-bold">
                    <span>Discount ({discountPercentage}%):</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span className="font-bold text-white">
                    {shippingFee === 0 ? (
                      <strong className="text-emerald-400">FREE</strong>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (18% GST):</span>
                  <span className="font-bold text-white">₹{estimatedTax.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-base font-black text-white pt-4 border-t border-gray-800">
                  <span>TOTAL:</span>
                  <span className="text-2xl text-[#E10600]">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-[#E10600] hover:bg-red-700 text-white font-extrabold py-4 rounded-xl uppercase text-xs tracking-widest transition-all shadow-xl shadow-red-600/30 flex items-center justify-center gap-2"
                id="checkout-btn"
              >
                CHECKOUT NOW <ShieldCheck className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-gray-500 text-center space-y-1">
                <p>🔒 256-Bit SSL Encrypted Checkout</p>
                <p>Free Returns within 30 days of purchase</p>
              </div>
            </div>
          </div>
        )}

        {/* CHECKOUT MODAL */}
        <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      </div>
    </div>
  );
};
