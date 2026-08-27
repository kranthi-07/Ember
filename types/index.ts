export type MenuCategory = 
  | "Starters" 
  | "Main Course" 
  | "Rice" 
  | "Breads" 
  | "Desserts" 
  | "Drinks";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  vegetarian: boolean;
  spicy: boolean;
  cuisine: string;
  servingSize: number;
  tags: string[];
  ingredients: string[];
  image?: string;
}

export interface UserPreferences {
  spicy: boolean | null;
  vegetarian: boolean | null;
  maxPrice: number | null;
  servings: number | null;
  categories: MenuCategory[];
  preferences: string[];
}
