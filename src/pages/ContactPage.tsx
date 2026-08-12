import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Clock, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Order Query',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill out all required fields.');
      return;
    }

    setIsSubmitted(true);
    showToast('Message sent! NIKE support will reply shortly.');
    setForm({ name: '', email: '', subject: 'Order Query', message: '' });
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* HEADER */}
        <div className="border-b border-gray-800 pb-8 space-y-2">
          <span className="text-[#E10600] text-xs font-black uppercase tracking-widest block">
            NIKE ATHLETE SERVICES
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-sans">
            LET'S TALK
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Have a question about your next pair or need sizing assistance? Our team is standing by.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* CONTACT FORM */}
          <div className="lg:col-span-7 bg-[#121212] border border-gray-800 rounded-2xl p-6 sm:p-10 space-y-6 shadow-2xl">
            <h2 className="text-xl font-black text-white uppercase tracking-wider border-b border-gray-800 pb-4">
              SEND US A MESSAGE
            </h2>

            {isSubmitted ? (
              <div className="bg-emerald-950/60 border border-emerald-600/60 p-8 rounded-xl text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-black text-white uppercase">MESSAGE RECEIVED</h3>
                <p className="text-gray-300 text-sm max-w-sm mx-auto">
                  Thank you for reaching out! A NIKE Athlete Specialist will review your message and respond within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-[#E10600] text-white text-xs font-extrabold px-6 py-2.5 rounded-lg uppercase tracking-wider mt-2"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Jordan Smith"
                      className="w-full bg-black border border-gray-800 focus:border-[#E10600] rounded-xl p-3 text-sm text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. jordan@example.com"
                      className="w-full bg-black border border-gray-800 focus:border-[#E10600] rounded-xl p-3 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-black border border-gray-800 focus:border-[#E10600] rounded-xl p-3 text-sm text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Order Query">Order & Delivery Status</option>
                    <option value="Sizing Help">Size & Fit Guidance</option>
                    <option value="Returns">Returns & Warranty</option>
                    <option value="Partnership">Brand & Athlete Sponsorships</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your sneaker inquiry..."
                    className="w-full bg-black border border-gray-800 focus:border-[#E10600] rounded-xl p-3 text-sm text-white focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E10600] hover:bg-red-700 text-white font-extrabold py-4 rounded-xl uppercase text-xs tracking-widest transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
                >
                  SEND MESSAGE <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* CONTACT INFO */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121212] border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-black text-white uppercase tracking-wider border-b border-gray-800 pb-3">
                DIRECT CONTACTS
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-[#E10600]/10 border border-[#E10600]/30 text-[#E10600] rounded-xl shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Customer Support</p>
                    <p className="text-white font-mono font-bold">support@nike.com</p>
                    <p className="text-[11px] text-gray-500">Fast 24-hour response time</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-[#E10600]/10 border border-[#E10600]/30 text-[#E10600] rounded-xl shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Business Hours</p>
                    <p className="text-white font-bold">Monday – Friday</p>
                    <p className="text-gray-300 text-xs">9:00 AM – 6:00 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-[#E10600]/10 border border-[#E10600]/30 text-[#E10600] rounded-xl shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Toll-Free Support</p>
                    <p className="text-white font-mono font-bold">+1 (800) 806-6453</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-[#E10600]/10 border border-[#E10600]/30 text-[#E10600] rounded-xl shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Global Headquarters</p>
                    <p className="text-white font-medium">One Bowerman Drive, Beaverton, OR 97005</p>
                  </div>
                </div>
              </div>
            </div>

            {/* STORE LOCATOR BANNER */}
            <div className="bg-gradient-to-br from-red-950 to-[#121212] border border-red-800/40 rounded-2xl p-6 space-y-2">
              <span className="text-[10px] font-black uppercase text-[#E10600] tracking-widest">
                IN-STORE EXPERIENCE
              </span>
              <h4 className="text-lg font-black text-white uppercase">FIND A NIKE STORE</h4>
              <p className="text-xs text-gray-300">
                Experience trial runs, custom foot scanning, and exclusive local drops at a flagship store near you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
