import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, subtotal, discountPercentage, clearCart, navigateTo } = useShop();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');
  const [orderId, setOrderId] = useState<string>('');

  const discountAmount = Math.round((subtotal * discountPercentage) / 100);
  const shippingFee = subtotal > 10000 || subtotal === 0 ? 0 : 499;
  const estimatedTax = Math.round(subtotal * 0.18); // 18% GST standard
  const finalTotal = subtotal - discountAmount + shippingFee + estimatedTax;

  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Rider',
    email: 'alex.rider@example.com',
    address: '42 Move Boulevard, Athletic Zone',
    city: 'Mumbai',
    postalCode: '400001',
    phone: '+91 98765 43210',
    paymentMethod: 'card', // 'card' | 'upi' | 'cod'
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = 'NK-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);
    setStep('confirmed');

    // Trigger celebratory canvas-confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E10600', '#FFFFFF', '#A80000', '#000000'],
      });
    } catch (err) {
      console.log('Confetti effect', err);
    }

    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#121212] border border-gray-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-red-950/60 my-8">
        {/* HEADER */}
        <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-[#0A0A0A]">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-white tracking-tight">NIKE CHECKOUT</span>
            <span className="text-xs font-bold text-[#E10600] bg-red-950/80 px-2 py-0.5 rounded border border-red-800/40">
              EXPRESS SECURE
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP PROGRESS INDICATOR */}
        {step !== 'confirmed' && (
          <div className="flex border-b border-gray-800 text-xs font-bold uppercase tracking-wider bg-black/40">
            <div
              className={`flex-1 py-3 text-center border-b-2 ${
                step === 'shipping' ? 'border-[#E10600] text-white' : 'border-transparent text-gray-500'
              }`}
            >
              1. SHIPPING ADDRESS
            </div>
            <div
              className={`flex-1 py-3 text-center border-b-2 ${
                step === 'payment' ? 'border-[#E10600] text-white' : 'border-transparent text-gray-500'
              }`}
            >
              2. PAYMENT
            </div>
          </div>
        )}

        {/* CONTENT BASED ON STEP */}
        <div className="p-6">
          {step === 'shipping' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep('payment');
              }}
              className="space-y-4"
            >
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#E10600]" /> DELIVERY DETAILS
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">First Name</label>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-[#E10600] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Last Name</label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-[#E10600] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-[#E10600] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-[#E10600] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Street Address</label>
                <input
                  required
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-[#E10600] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">City</label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-[#E10600] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Postal Code</label>
                  <input
                    required
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-[#E10600] focus:outline-none"
                  />
                </div>
              </div>

              {/* SUMMARY BOX */}
              <div className="bg-black/60 border border-gray-800 rounded-xl p-3 flex items-center justify-between text-xs text-gray-300 mt-4">
                <span>Total Payable:</span>
                <span className="text-base font-black text-white">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#E10600] hover:bg-red-700 text-white font-extrabold py-3.5 rounded-xl uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 mt-4"
              >
                PROCEED TO PAYMENT
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handleCompleteOrder} className="space-y-5">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#E10600]" /> SELECT PAYMENT METHOD
              </h3>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 bg-black border border-red-600/50 rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="accent-[#E10600]"
                  />
                  <span className="text-sm font-bold text-white">Credit / Debit Card (Visa, Mastercard)</span>
                </label>

                <label className="flex items-center gap-3 p-3 bg-black border border-gray-800 rounded-xl cursor-pointer hover:border-gray-700">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                    className="accent-[#E10600]"
                  />
                  <span className="text-sm font-bold text-white">UPI Instant Payment (GPay, PhonePe, Paytm)</span>
                </label>

                <label className="flex items-center gap-3 p-3 bg-black border border-gray-800 rounded-xl cursor-pointer hover:border-gray-700">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="accent-[#E10600]"
                  />
                  <span className="text-sm font-bold text-white">Cash on Delivery (Standard Verification)</span>
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="bg-black/80 border border-gray-800 p-4 rounded-xl space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-400 font-bold mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      defaultValue="4532 •••• •••• 8821"
                      className="w-full bg-gray-900 border border-gray-800 rounded p-2 text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        placeholder="08/28"
                        defaultValue="08/28"
                        className="w-full bg-gray-900 border border-gray-800 rounded p-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-bold mb-1">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        defaultValue="888"
                        className="w-full bg-gray-900 border border-gray-800 rounded p-2 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-black/60 border border-gray-800 rounded-xl p-4 space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-red-500 font-bold">
                    <span>Discount ({discountPercentage}%):</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>Delivery:</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Estimated Tax (18% GST):</span>
                  <span>₹{estimatedTax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-gray-800">
                  <span>FINAL TOTAL:</span>
                  <span className="text-[#E10600]">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="w-1/3 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all"
                >
                  BACK
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-[#E10600] hover:bg-red-700 text-white font-extrabold py-3.5 rounded-xl uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
                >
                  CONFIRM & PLACE ORDER
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 'confirmed' && (
            <div className="text-center py-6 space-y-5">
              <div className="w-20 h-20 bg-red-600/20 border-2 border-[#E10600] text-[#E10600] rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-black tracking-widest text-[#E10600] uppercase">
                  ORDER CONFIRMED
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  BUILT TO MOVE.
                </h2>
                <p className="text-sm text-gray-300 max-w-sm mx-auto">
                  Thank you, <span className="text-white font-bold">{formData.firstName}</span>! Your NIKE order{' '}
                  <span className="text-[#E10600] font-mono font-bold">{orderId}</span> has been dispatched for express priority delivery.
                </p>
              </div>

              <div className="bg-black/80 border border-gray-800 p-4 rounded-xl max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Estimated Delivery:</span>
                  <span className="text-white font-bold">2–3 Business Days</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Shipping Address:</span>
                  <span className="text-white font-medium text-right max-w-[200px]">
                    {formData.address}, {formData.city}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Paid:</span>
                  <span className="text-[#E10600] font-black">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  navigateTo('shop');
                }}
                className="bg-[#E10600] hover:bg-red-700 text-white font-extrabold px-8 py-3.5 rounded-xl uppercase tracking-widest text-xs transition-all shadow-lg shadow-red-600/30"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
