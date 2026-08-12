export type Category = 'All' | 'Running' | 'Lifestyle' | 'Basketball' | 'Training';

export type PriceRange = 'all' | 'under-10k' | '10k-15k' | 'above-15k';

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';

export interface SneakerColor {
  name: string;
  hex: string;
  bgClass: string;
}

export interface SneakerProduct {
  id: string;
  name: string;
  tagline: string;
  price: number; // in INR ₹
  originalPrice?: number;
  category: Category;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  image: string;
  gallery: string[];
  description: string;
  details: string[];
  materials: string[];
  colors: SneakerColor[];
  sizes: number[];
  specifications: {
    weight: string;
    cushioning: string;
    drop: string;
    surface: string;
  };
}

export interface CartItem {
  id: string; // unique cart item id: `${productId}-${size}-${color.name}`
  product: SneakerProduct;
  selectedSize: number;
  selectedColor: SneakerColor;
  quantity: number;
}

export interface FilterState {
  category: Category;
  priceRange: PriceRange;
  searchQuery: string;
  sortBy: SortOption;
}
