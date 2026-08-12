import React from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_QUOTE } from '../data/products';
import { ArrowUpRight, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* BRAND STATEMENT & QUOTE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          <div className="lg:col-span-7 space-y-3">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase text-white font-sans">
              NIKE<span className="text-[#E10600]">.</span>
            </h2>
            <p className="text-lg font-bold italic tracking-tight text-[#E10600]">
              "{BRAND_QUOTE}"
            </p>
            <p className="text-white/50 text-xs max-w-md leading-relaxed">
              Precision engineered footwear designed for athletic power, modern street performance, and everyday motion.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end items-start lg:items-end">
            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center gap-2 bg-[#E10600] hover:bg-[#A80000] text-white font-bold px-8 py-4 text-xs tracking-widest uppercase transition-all group"
            >
              EXPLORE FULL COLLECTION
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs">
          {/* SHOP */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4 border-l-2 border-[#E10600] pl-2">
              SHOP
            </h3>
            <ul className="space-y-2.5 text-white/60 font-medium">
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  New Releases
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  Running
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  Lifestyle
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  Basketball
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  Training
                </button>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4 border-l-2 border-[#E10600] pl-2">
              COMPANY
            </h3>
            <ul className="space-y-2.5 text-white/60 font-medium">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  Our Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition-colors opacity-75">
                  Careers (2026)
                </a>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4 border-l-2 border-[#E10600] pl-2">
              SUPPORT
            </h3>
            <ul className="space-y-2.5 text-white/60 font-medium">
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Shipping Info
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  Size Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Customer FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4 border-l-2 border-[#E10600] pl-2">
              SOCIAL
            </h3>
            <div className="flex space-x-2 mb-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#E10600] hover:border-[#E10600] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#E10600] hover:border-[#E10600] transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#E10600] hover:border-[#E10600] transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            <p className="text-white/40 text-[11px] leading-relaxed font-mono">
              Follow #NIKEMOVE2026 for daily footwear showcases.
            </p>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-white/40 text-[11px] gap-4 font-mono">
          <p>© 2026 NIKE. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
