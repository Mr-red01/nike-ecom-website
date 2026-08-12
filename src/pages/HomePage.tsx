import React, { useState } from 'react';
import { ArrowRight, Zap, Shield, Flame, CheckCircle, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SNEAKER_PRODUCTS, BRAND_QUOTE } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import heroSneakerImg from '../assets/images/nike_orange_red_hero_sneaker_1786516985547.jpg';
import brandStoryImg from '../assets/images/nike_brand_story_1786513753237.jpg';

export const HomePage: React.FC = () => {
  const { navigateTo, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const featuredProducts = SNEAKER_PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      showToast('Welcome to the NIKE Movement Club!');
      setNewsletterEmail('');
    } else {
      showToast('Please enter a valid email address.');
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pt-20 overflow-x-hidden">
      {/* 1. HERO SECTION - SLEEK INTERFACE THEME */}
      <section className="relative min-h-[88vh] flex items-center justify-center px-6 sm:px-10 py-12 lg:py-16 border-b border-white/10 overflow-hidden">
        {/* Giant Watermark AIR Background Text */}
        <div className="absolute -left-10 sm:-left-20 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none z-0">
          <h2 className="text-[200px] sm:text-[320px] font-black tracking-tighter leading-none">AIR</h2>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* HERO LEFT COLUMN */}
          <div className="lg:col-span-6 space-y-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="bg-[#E10600] text-[10px] font-bold px-2 py-1 tracking-widest text-white uppercase">
                NEW
              </span>
              <span className="text-xs font-semibold tracking-[0.3em] text-white/60 uppercase">
                COLLECTION — 2026
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
              <h1 className="text-[56px] sm:text-[80px] lg:text-[92px] leading-[0.85] font-black tracking-tighter uppercase">
                NIKE <br />
                <span className="text-[#E10600]">VISION</span>
              </h1>

              {/* Inline Shoe Badge next to NIKE VISION heading */}
              <div
                onClick={() => navigateTo('product-details', 'air-max-vision')}
                className="relative group cursor-pointer shrink-0 self-start sm:self-center"
                title="View Nike Vision Edition"
              >
                <div className="w-32 h-24 sm:w-44 sm:h-28 bg-gradient-to-br from-black via-red-950/60 to-black border-2 border-[#E10600]/50 rounded-2xl p-2 flex items-center justify-center relative shadow-2xl hover:border-[#E10600] hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-[#E10600]/10 rounded-2xl blur-md group-hover:bg-[#E10600]/20 transition-all" />
                  <img
                    src={heroSneakerImg}
                    alt="Nike Vision Inline Sneaker"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(225,6,0,0.5)] -rotate-12 group-hover:rotate-0 transition-transform duration-300 z-10"
                  />
                  <span className="absolute -top-2.5 -right-2 bg-[#E10600] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full tracking-widest uppercase shadow-md z-20">
                    AIR VISION
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xl sm:text-2xl font-bold italic tracking-tight mb-4 uppercase leading-none text-white">
              "BUILT TO MOVE.<br />
              DESIGNED TO STAND OUT."
            </p>

            <p className="text-white/50 max-w-md mb-8 text-sm leading-relaxed">
              Engineered for movement. Designed for everyday impact. Discover the latest generation of performance-inspired sneakers featuring the all-new reactive carbon plating.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigateTo('shop')}
                className="bg-[#E10600] hover:bg-[#A80000] text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all flex items-center gap-3"
                id="hero-shop-btn"
              >
                SHOP COLLECTION <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateTo('about')}
                className="border border-white/20 hover:bg-white hover:text-black text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all"
                id="hero-explore-btn"
              >
                EXPLORE
              </button>
            </div>

            {/* Quick Tech Specs Bar */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-md">
              <div>
                <p className="text-lg font-black text-white">315G</p>
                <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase">WEIGHT</p>
              </div>
              <div>
                <p className="text-lg font-black text-[#E10600]">100%</p>
                <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase">ENERGY RETURN</p>
              </div>
              <div>
                <p className="text-lg font-black text-white">AIR MAX</p>
                <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase">TECH</p>
              </div>
            </div>
          </div>

          {/* HERO RIGHT COLUMN - LARGE PROMINENT ORANGE-RED SNEAKER */}
          <div className="lg:col-span-6 h-full flex items-center justify-center relative min-h-[440px] sm:min-h-[560px]">
            {/* Glowing Orange-Red & Crimson Background Halo */}
            <div className="absolute w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-tr from-[#E10600]/25 via-orange-500/15 to-transparent rounded-full blur-[120px] pointer-events-none" />

            {/* Subtle Sleek Ambient Rings */}
            <div className="absolute w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] border border-white/10 rounded-full pointer-events-none flex items-center justify-center">
              <div className="w-[260px] sm:w-[380px] h-[260px] sm:h-[380px] border border-[#E10600]/30 rounded-full border-dashed animate-spin-slow" style={{ animationDuration: '30s' }} />
            </div>

            {/* Large Prominent Floating Sneaker Container */}
            <div
              onClick={() => navigateTo('product-details', 'air-max-vision')}
              className="relative z-20 group cursor-pointer w-full flex items-center justify-center p-2 sm:p-6"
            >
              <img
                src={heroSneakerImg}
                alt="NIKE Vision - Orange & Red Edition"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[440px] sm:max-h-[520px] lg:max-h-[560px] object-contain filter drop-shadow-[0_35px_60px_rgba(225,6,0,0.45)] group-hover:scale-105 transition-all duration-500 ease-out rounded-3xl"
              />

              {/* Floating Professional Spec Badges */}
              <div className="absolute bottom-4 left-2 sm:left-4 bg-black/90 backdrop-blur-md border border-[#E10600]/40 px-4 py-2.5 flex items-center gap-3 shadow-2xl rounded-xl">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E10600] animate-ping" />
                <div>
                  <p className="text-[9px] font-mono tracking-widest text-orange-400 uppercase font-bold">FLAGSHIP DROP</p>
                  <p className="text-xs font-black text-white uppercase tracking-wider">AIR MAX VISION • ORANGE RED</p>
                </div>
              </div>
            </div>

            {/* Technical Specifications overlay top right */}
            <div className="absolute top-2 right-0 flex flex-col items-end gap-1 pointer-events-none bg-black/60 backdrop-blur-sm p-3 border border-white/10 rounded-xl">
              <span className="text-[11px] font-mono text-orange-400 font-bold tracking-widest uppercase">Model: VM-26-ORANGE</span>
              <span className="text-[11px] font-mono text-white/60 tracking-widest uppercase">Tech: Carbon-Air 4.0</span>
              <div className="mt-2 flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E10600]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAJOR VISUAL STATEMENT BANNER */}
      <section className="bg-[#E10600] text-white py-6 border-y border-[#E10600] overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee space-x-12 text-xl sm:text-2xl font-black tracking-tight uppercase font-sans">
          <span>{BRAND_QUOTE}</span>
          <span className="text-black/60">•</span>
          <span>ENGINEERED FOR MOVEMENT</span>
          <span className="text-black/60">•</span>
          <span>NIKE 2026 COLLECTION</span>
          <span className="text-black/60">•</span>
          <span>{BRAND_QUOTE}</span>
          <span className="text-black/60">•</span>
          <span>ENGINEERED FOR MOVEMENT</span>
        </div>
      </section>

      {/* 3. FEATURED DROPS - SLEEK INTERFACE THEME */}
      <section className="bg-white/5 border-t border-white/10 px-6 sm:px-10 py-12 flex flex-col gap-6 max-w-7xl mx-auto my-12">
        <div className="flex justify-between items-end border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#E10600] mb-1">
              Featured Drops
            </h3>
            <p className="text-xl font-bold tracking-tight text-white">
              The latest silhouettes engineered for pace.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigateTo('shop')}
              className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-[#E10600] transition-colors"
              title="Shop all"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. PERFORMANCE SECTION: ENGINEERED DIFFERENTLY */}
      <section className="py-16 px-6 sm:px-10 max-w-7xl mx-auto border-t border-white/10 relative">
        <div className="space-y-12">
          <div className="text-left max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E10600]">
              TECHNOLOGY & INNOVATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">
              ENGINEERED DIFFERENTLY
            </h2>
            <p className="text-white/60 text-sm">
              Every curve, foam cell, and outsole tread is precision tuned to augment human biomechanics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white/5 border border-white/10 hover:border-[#E10600] p-8 space-y-4 transition-all">
              <div className="w-12 h-12 border border-[#E10600] text-[#E10600] flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                RESPONSIVE CUSHIONING
              </h3>
              <p className="text-white/60 text-xs leading-relaxed">
                Soft landings. Powerful takeoffs. Dual-density nitrogen injected foam absorbs shock and redirects energy back into your stride.
              </p>
              <div className="text-xs font-mono text-[#E10600] tracking-widest uppercase">
                +13% ENERGY RETURN
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 border border-white/10 border-l-2 border-l-[#E10600] hover:border-[#E10600] p-8 space-y-4 transition-all">
              <div className="w-12 h-12 border border-[#E10600] text-[#E10600] flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                LIGHTWEIGHT BUILD
              </h3>
              <p className="text-white/60 text-xs leading-relaxed">
                Less weight. More movement. Seamless Flyknit weave creates an adaptive glove fit without unnecessary bulk.
              </p>
              <div className="text-xs font-mono text-[#E10600] tracking-widest uppercase">
                210G FEATHERWEIGHT
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 border border-white/10 hover:border-[#E10600] p-8 space-y-4 transition-all">
              <div className="w-12 h-12 border border-[#E10600] text-[#E10600] flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                EVERYDAY COMFORT
              </h3>
              <p className="text-white/60 text-xs leading-relaxed">
                Performance designed for everyday life. High-abrasion waffle outsoles grip urban pavement through rain or shine.
              </p>
              <div className="text-xs font-mono text-[#E10600] tracking-widest uppercase">
                24/7 DURABILITY GUARANTEE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BRAND STORY SECTION */}
      <section className="relative py-20 px-6 sm:px-10 overflow-hidden border-t border-white/10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E10600]">
              OUR MANIFESTO
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              MORE THAN A SNEAKER.
            </h2>
            <p className="text-xl sm:text-2xl font-bold italic tracking-tight text-white uppercase">
              "ENGINEERED FOR THE ONES WHO KEEP MOVING."
            </p>
            <p className="text-white/60 text-sm leading-relaxed max-w-xl">
              From early morning track intervals to late night city streets, NIKE footwear is built with unwavering standards of athletic perfection. Every silhouette is tested by world-class athletes before it ever hits your feet.
            </p>
            <div>
              <button
                onClick={() => navigateTo('about')}
                className="bg-[#E10600] hover:bg-[#A80000] text-white font-bold px-8 py-4 uppercase tracking-widest text-xs transition-all inline-flex items-center gap-3"
              >
                OUR STORY <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="border border-white/20 p-2 bg-white/5">
              <img
                src={brandStoryImg}
                alt="NIKE Brand Story"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover filter contrast-125 grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER SECTION */}
      <section className="py-16 px-6 sm:px-10 max-w-4xl mx-auto text-center border-t border-white/10 my-12">
        <div className="bg-white/5 border border-white/10 p-8 sm:p-12 space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E10600]">
            NIKE INSIDER CLUB
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">
            STAY IN THE LOOP.
          </h2>
          <p className="text-white/60 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Get first access to new drops, exclusive releases, athlete stories, and secret promo discounts directly to your inbox.
          </p>

          {newsletterSubscribed ? (
            <div className="border border-emerald-500/50 bg-emerald-950/40 text-emerald-400 p-4 flex items-center justify-center gap-2 max-w-md mx-auto">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider">YOU'RE IN THE CLUB! CHECK YOUR INBOX.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-black border border-white/20 focus:border-[#E10600] text-white text-xs px-4 py-3.5 focus:outline-none uppercase font-mono"
              />
              <button
                type="submit"
                className="bg-[#E10600] hover:bg-[#A80000] text-white font-bold px-8 py-3.5 uppercase text-xs tracking-widest transition-all shrink-0"
              >
                JOIN
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
