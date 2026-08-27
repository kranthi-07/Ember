import { MenuItem, UserPreferences } from "@/types";
import { menuData } from "./menu-data";

/**
 * Filter and match menu items based on AI-extracted user preferences.
 */
export function getMatchingMenuItems(
  preferences: UserPreferences,
  menu: MenuItem[] = menuData
): MenuItem[] {
  let matched = [...menu];

  // 1. Strict boolean filters
  if (preferences.vegetarian !== null) {
    matched = matched.filter((item) => item.vegetarian === preferences.vegetarian);
  }

  if (preferences.spicy !== null) {
    matched = matched.filter((item) => item.spicy === preferences.spicy);
  }

  // 2. Max Price filter (per item)
  if (preferences.maxPrice !== null && preferences.maxPrice > 0) {
    // If the user wants a meal under ₹800 for 2 people, they might want items that cost less than 800.
    matched = matched.filter((item) => item.price <= preferences.maxPrice!);
  }

  // 3. Categories filter
  if (preferences.categories && preferences.categories.length > 0) {
    matched = matched.filter((item) => preferences.categories.includes(item.category));
  }

  // 4. Soft keyword/preferences matching (e.g. "chicken", "light", "sweet")
  if (preferences.preferences && preferences.preferences.length > 0) {
    const prefKeywords = preferences.preferences
      .map((p) => p.toLowerCase().trim())
      .filter((p) => p.length > 0);
    
    if (prefKeywords.length > 0) {
      matched = matched.filter((item) => {
        const itemText = [
          item.name,
          item.description,
          ...item.tags,
          ...item.ingredients,
          item.cuisine,
        ]
          .join(" ")
          .toLowerCase();

        // Item should match at least one of the preference keywords if specified
        return prefKeywords.some((keyword) => itemText.includes(keyword));
      });
    }
  }

  return matched;
}

/**
 * Calculate the total price of a cart.
 * Cart items is an array of { item: MenuItem, quantity: number }
 */
export function calculateCartTotal(cartItems: { item: MenuItem; quantity: number }[]): number {
  return cartItems.reduce((total, cartItem) => {
    return total + cartItem.item.price * cartItem.quantity;
  }, 0);
}
