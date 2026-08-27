"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AIStatusIndicator } from "@/components/ai/ai-status";
import { PreferenceChip } from "@/components/ai/preference-chip";
import { RecommendationGrid } from "@/components/menu/recommendation-grid";
import { FloatingCart } from "@/components/cart/floating-cart";
import { CartPanel } from "@/components/cart/cart-panel";
import { UserPreferences, MenuItem } from "@/types";
import { getMatchingMenuItems, calculateCartTotal } from "@/lib/match-utils";
import { menuData } from "@/lib/menu-data";

export default function Home() {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [preferences, setPreferences] = React.useState<UserPreferences | null>(null);
  const [matches, setMatches] = React.useState<MenuItem[]>([]);
  
  // Cart State
  const [cart, setCart] = React.useState<{ item: MenuItem; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Phase 9: Dismiss mobile keyboard for the screen recording
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setStatus("loading");
    setPreferences(null);
    setMatches([]);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query }),
      });

      if (!res.ok) {
        throw new Error("Failed to process");
      }

      const parsedPrefs: UserPreferences = await res.json();
      setPreferences(parsedPrefs);
      
      const results = getMatchingMenuItems(parsedPrefs, menuData);
      setMatches(results);
      setStatus("success");
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setQuery("");
    setPreferences(null);
    setMatches([]);
  };

  // Cart Handlers
  const handleAddToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) {
        return prev.map(c => c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleDecrease = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing && existing.quantity > 1) {
        return prev.map(c => c.item.id === item.id ? { ...c, quantity: c.quantity - 1 } : c);
      }
      return prev.filter(c => c.item.id !== item.id);
    });
  };

  const cartItemCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartTotal = calculateCartTotal(cart);

  return (
    <main className="min-h-screen bg-background flex flex-col selection:bg-ember-accent/20 pb-24">
      {/* Header */}
      <header className="w-full px-6 py-6 flex justify-between items-center bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="font-serif text-2xl font-bold tracking-tight text-foreground cursor-pointer" onClick={handleReset}>
          EMBER
        </div>
      </header>

      {/* Main Content */}
      <section className="flex-1 flex flex-col px-6 py-8 md:py-16 max-w-2xl mx-auto w-full">
        
        {/* Hero Text */}
        <AnimatePresence>
          {status === "idle" && (
            <motion.div 
              initial={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-6 mb-12 w-full"
            >
              <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground">
                Find exactly what <br className="md:hidden" />
                you&apos;re craving.
              </h1>
              <p className="text-ember-text-secondary text-base md:text-lg max-w-md mx-auto">
                Tell us what you want. We&apos;ll find it.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Input Area */}
        <motion.div 
          layout
          className="w-full relative shadow-float rounded-xl bg-ember-surface p-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-ember-accent/50 focus-within:shadow-xl z-10"
        >
          <form onSubmit={handleSubmit} className="flex relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-ember-text-secondary">
              <Search className="h-5 w-5" />
            </div>
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={status === "loading"}
              autoFocus
              placeholder="Try: spicy dinner for two under ₹800"
              className="pl-12 h-14 md:h-16 text-base md:text-lg border-0 shadow-none focus-visible:ring-0 bg-transparent disabled:opacity-50"
            />
            
            <div className="absolute inset-y-0 right-2 flex items-center gap-2">
              {status !== "idle" && (
                 <Button 
                   type="button" 
                   variant="ghost" 
                   size="icon" 
                   onClick={handleReset}
                   className="h-10 w-10 text-ember-text-secondary hover:text-foreground"
                 >
                   <X className="h-5 w-5" />
                 </Button>
              )}
              <Button 
                type="submit" 
                size="sm"
                disabled={status === "loading" || !query.trim()}
                className="h-10 md:h-12 px-6 rounded-lg bg-ember-accent hover:bg-ember-accent/90 text-white font-medium shadow-sm transition-all active:scale-95 disabled:opacity-50"
              >
                Find
              </Button>
            </div>
          </form>
        </motion.div>

        {/* AI Loading State */}
        <AnimatePresence>
          {status === "loading" && (
            <motion.div layout>
              <AIStatusIndicator />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success / Error / Empty States */}
        <AnimatePresence>
          {status !== "idle" && status !== "loading" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-8 flex flex-col gap-8 w-full"
            >
              {/* Preferences Container (Only on success) */}
              {status === "success" && preferences && (
                <div className="flex flex-wrap gap-2">
                  {preferences.spicy === true && <PreferenceChip label="Spicy" icon="🌶" />}
                  {preferences.vegetarian === true && <PreferenceChip label="Vegetarian" icon="🥬" />}
                  {(preferences.servings ?? 0) > 0 && <PreferenceChip label={`${preferences.servings} People`} icon="👥" />}
                  {(preferences.maxPrice ?? 0) > 0 && <PreferenceChip label={`Max ₹${preferences.maxPrice}`} icon="🏷" />}
                  {preferences.categories.map(c => (
                    <PreferenceChip key={c} label={c} />
                  ))}
                  {preferences.preferences.map(p => (
                    <PreferenceChip key={p} label={p} />
                  ))}
                </div>
              )}

              {/* Recommendations Area */}
              <div className="pt-4 border-t border-ember-border">
                {status === "success" && matches.length > 0 && (
                  <h2 className="font-serif text-xl font-medium mb-6">Made for your craving</h2>
                )}
                <RecommendationGrid 
                  items={matches}
                  cart={cart}
                  status={status} 
                  onAdd={handleAddToCart}
                  onIncrease={handleAddToCart}
                  onDecrease={handleDecrease}
                  onRetry={handleReset} 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>
      
      {/* Sticky Bottom Cart */}
      <FloatingCart itemCount={cartItemCount} total={cartTotal} onClick={() => setIsCartOpen(true)} />

      {/* Slide up Cart Page */}
      <CartPanel 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        total={cartTotal}
        onIncrease={handleAddToCart}
        onDecrease={handleDecrease}
      />
    </main>
  );
}
