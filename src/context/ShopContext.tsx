import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, SneakerProduct, SneakerColor } from '../types';
import { SNEAKER_PRODUCTS } from '../data/products';

export type PageName = 'home' | 'shop' | 'product-details' | 'about' | 'contact' | 'cart';

interface ShopContextType {
  cart: CartItem[];
  addToCart: (product: SneakerProduct, selectedSize: number, selectedColor: SneakerColor, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discountPercentage: number;
  appliedPromo: string | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  
  currentPage: PageName;
  navigateTo: (page: PageName, productId?: string) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nike_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentPage, setCurrentPage] = useState<PageName>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('air-max-vision');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nike_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nike_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('nike_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Handle hash change or scroll reset on navigate
  const navigateTo = (page: PageName, productId?: string) => {
    setCurrentPage(page);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const addToCart = (
    product: SneakerProduct,
    selectedSize: number,
    selectedColor: SneakerColor,
    quantity: number = 1
  ) => {
    const cartItemId = `${product.id}-${selectedSize}-${selectedColor.name}`;
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            selectedSize,
            selectedColor,
            quantity,
          },
        ];
      }
    });
    showToast(`Added ${product.name} (Size ${selectedSize}) to Bag!`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from Bag');
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
    setDiscountPercentage(0);
  };

  const applyPromo = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'NIKE2026' || cleanCode === 'MOVE20') {
      setAppliedPromo(cleanCode);
      setDiscountPercentage(15);
      showToast('Promo code applied: 15% Discount!');
      return { success: true, message: '15% Discount applied successfully!' };
    } else if (cleanCode === 'FIRSTPAIR' || cleanCode === 'VIP10') {
      setAppliedPromo(cleanCode);
      setDiscountPercentage(10);
      showToast('Promo code applied: 10% Discount!');
      return { success: true, message: '10% Discount applied!' };
    } else {
      return { success: false, message: 'Invalid promo code. Try NIKE2026 for 15% off.' };
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setDiscountPercentage(0);
    showToast('Promo code removed');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from favorites');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to favorites');
        return [...prev, productId];
      }
    });
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discountPercentage,
        appliedPromo,
        applyPromo,
        removePromo,
        currentPage,
        navigateTo,
        selectedProductId,
        setSelectedProductId,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        toastMessage,
        showToast,
        wishlist,
        toggleWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
