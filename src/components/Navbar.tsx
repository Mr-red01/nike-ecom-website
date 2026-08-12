import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { useShop, PageName } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const { currentPage, navigateTo, totalItems, setIsSearchOpen, wishlist } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; page: PageName }[] = [
    { name: 'HOME', page: 'home' },
    { name: 'SHOP', page: 'shop' },
    { name: 'ABOUT', page: 'about' },
    { name: 'CONTACT', page: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/10 py-4'
          : 'bg-[#0A0A0A]/60 backdrop-blur-sm border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* LOGO */}
        <button
          onClick={() => navigateTo('home')}
          className="group flex items-center gap-2 text-left focus:outline-none"
          id="nike-logo-btn"
        >
          <div className="flex items-center gap-1">
            <span className="text-3xl font-black tracking-tighter text-white uppercase font-sans">
              NIKE<span className="text-[#E10600]">.</span>
            </span>
          </div>
        </button>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => navigateTo(link.page)}
                className={`text-xs font-bold uppercase tracking-widest transition-colors duration-200 pb-1 ${
                  isActive
                    ? 'text-[#E10600] border-b-2 border-[#E10600]'
                    : 'text-white/80 hover:text-[#E10600]'
                }`}
                id={`nav-link-${link.page}`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-6">
          {/* SEARCH BUTTON */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-white/80 hover:text-[#E10600] transition-colors"
            title="Search products"
            id="search-btn"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* WISHLIST BUTTON */}
          {wishlist.length > 0 && (
            <button
              onClick={() => navigateTo('shop')}
              className="text-white/80 hover:text-red-500 relative transition-all"
              title="Favorites"
            >
              <Heart className="w-5 h-5 fill-red-600 text-red-600" />
              <span className="absolute -top-1 -right-1 bg-[#E10600] text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {wishlist.length}
              </span>
            </button>
          )}

          {/* SHOPPING BAG */}
          <button
            onClick={() => navigateTo('cart')}
            className="relative text-white/80 hover:text-[#E10600] transition-colors flex items-center justify-center"
            title="Shopping Bag"
            id="cart-btn"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E10600] text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white focus:outline-none"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#E10600]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A]/98 backdrop-blur-xl border-b border-red-600/30 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => {
                    navigateTo(link.page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-base font-extrabold tracking-wider py-2 uppercase border-b border-gray-800/60 ${
                    isActive ? 'text-[#E10600] pl-2 border-[#E10600]' : 'text-gray-200 hover:text-white'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
            <button
              onClick={() => {
                navigateTo('cart');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-between text-left text-base font-extrabold tracking-wider py-3 text-white bg-gradient-to-r from-[#E10600] to-[#A80000] px-4 rounded-lg mt-2 shadow-lg shadow-red-600/20"
            >
              <span>VIEW BAG</span>
              <span className="bg-black/40 px-2 py-0.5 rounded text-xs">{totalItems} ITEMS</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
