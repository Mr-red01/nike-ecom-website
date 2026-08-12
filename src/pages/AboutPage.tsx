import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Flame, Target, Compass, Award } from 'lucide-react';
import brandStoryImg from '../assets/images/nike_brand_story_1786513753237.jpg';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* HERO HEADER */}
        <div className="text-center max-w-4xl mx-auto space-y-6 pt-6">
          <span className="bg-red-950/80 border border-red-800/40 text-[#E10600] text-xs font-black uppercase px-4 py-1.5 rounded-full tracking-widest inline-block">
            ABOUT NIKE FOOTWEAR
          </span>
          <h1 className="text-5xl sm:text-7xl font-black text-white uppercase tracking-tight font-sans leading-none">
            BUILT FOR MOVEMENT<span className="text-[#E10600]">.</span>
          </h1>
          <p className="text-lg sm:text-2xl font-bold text-gray-300 leading-relaxed italic">
            "Movement is more than a destination. It's a mindset. We create sneakers designed to move with you — from the first step of the morning to the final mile of the day."
          </p>
        </div>

        {/* LIFESTYLE IMAGE BANNER */}
        <div className="relative rounded-3xl overflow-hidden border border-red-600/30 aspect-[16/9] sm:aspect-[21/9] shadow-2xl">
          <img
            src={brandStoryImg}
            alt="Nike Brand Philosophy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter contrast-125 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-6 sm:p-12">
            <div className="max-w-xl space-y-2">
              <span className="text-xs font-black uppercase text-[#E10600] tracking-widest">
                HERITAGE & VISION
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                INNOVATION IN EVERY SEAM
              </h2>
            </div>
          </div>
        </div>

        {/* THREE CORE PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* OUR PHILOSOPHY */}
          <div className="bg-[#121212] border border-gray-800/80 p-8 rounded-2xl space-y-4 hover:border-[#E10600]/60 transition-all group">
            <div className="w-12 h-12 bg-[#E10600]/10 border border-[#E10600]/30 text-[#E10600] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              OUR PHILOSOPHY
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Performance meets everyday style. We believe high-tier athletic engineering shouldn't be confined to track fields. Every pair is crafted to excel in both brutal workouts and high-fashion urban streets.
            </p>
          </div>

          {/* OUR DESIGN */}
          <div className="bg-[#121212] border border-gray-800/80 p-8 rounded-2xl space-y-4 hover:border-[#E10600]/60 transition-all group">
            <div className="w-12 h-12 bg-[#E10600]/10 border border-[#E10600]/30 text-[#E10600] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              OUR DESIGN
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every silhouette balances comfort, fluid movement, and bold visual identity. Striking color blocked soles paired with breathable Flyknit uppers create instant recognition.
            </p>
          </div>

          {/* OUR FUTURE */}
          <div className="bg-[#121212] border border-gray-800/80 p-8 rounded-2xl space-y-4 hover:border-[#E10600]/60 transition-all group">
            <div className="w-12 h-12 bg-[#E10600]/10 border border-[#E10600]/30 text-[#E10600] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              OUR FUTURE
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We're constantly pushing footwear design forward. Utilizing 100% circular recycled grind rubber and carbon composite power plates to sculpt the future of speed.
            </p>
          </div>
        </div>

        {/* STATS SHOWCASE */}
        <div className="bg-gradient-to-r from-[#121212] via-black to-[#121212] border border-red-600/30 rounded-3xl p-8 sm:p-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-black text-[#E10600]">50+</p>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">YEARS INNOVATION</p>
          </div>
          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-black text-white">100%</p>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">RECYCLED KNIT OPTIONS</p>
          </div>
          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-black text-[#E10600]">24/7</p>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">ENERGY RETURN</p>
          </div>
          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-black text-white">15M+</p>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">ATHLETES MOVED</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6 pt-6">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            READY TO TAKE YOUR NEXT STEP?
          </h2>
          <button
            onClick={() => navigateTo('shop')}
            className="bg-[#E10600] hover:bg-red-700 text-white font-extrabold px-10 py-4 rounded-xl text-xs tracking-widest uppercase transition-all shadow-xl shadow-red-600/30 inline-flex items-center gap-2"
          >
            SHOP THE COLLECTION <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
