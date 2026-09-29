"use client";

import * as React from "react";
import { Search, X, Utensils, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AIStatusIndicator } from "@/components/ui/ai-status-indicator";
import { PreferenceChip } from "@/components/ui/preference-chip";
import { RecommendationGrid } from "@/components/menu/recommendation-grid";
import { FloatingCart } from "@/components/cart/floating-cart";
import { CartPanel } from "@/components/cart/cart-panel";
import { UserPreferences, MenuItem } from "@/types";
import { getMatchingMenuItems, calculateCartTotal } from "@/lib/match-utils";
import { menuData } from "@/lib/menu-data";
import { Premium3DScene } from "@/components/3d/premium-scene";

type View = "HUB" | "AI" | "MENU";

export default function Home() {
  const [view, setView] = React.useState<View>("HUB");

  // AI State
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

      if (!res.ok) throw new Error("Failed to process");

      const parsedPrefs: UserPreferences = await res.json();
      setPreferences(parsedPrefs);
      
      const results = getMatchingMenuItems(parsedPrefs, menuData);
      setMatches(results);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setQuery("");
    setPreferences(null);
    setMatches([]);
  };

  const handleAddToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) {
        return prev.map(c => c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  // Bridge for 3D scene clicks
  React.useEffect(() => {
    const handleAddEvent = (e: CustomEvent<MenuItem>) => handleAddToCart(e.detail);
    window.addEventListener('add-to-cart', handleAddEvent as EventListener);
    return () => window.removeEventListener('add-to-cart', handleAddEvent as EventListener);
  }, []);

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
    <main className="h-screen w-full bg-zinc-950 overflow-hidden relative font-sans text-foreground selection:bg-ember-accent/20 [perspective:2000px]">
      
      {/* 3D Glass Torus Background & 3D Interactive Panels */}
      <Premium3DScene view={view} />

      {/* Foreground UI Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col">
        
        {/* Dynamic Header */}
        <header className="w-full p-6 flex justify-between items-center pointer-events-auto">
          <div className="flex items-center gap-4">
            <AnimatePresence>
              {view !== "HUB" && (
                <motion.div
                  initial={{ opacity: 0, rotateY: -90, x: -20 }}
                  animate={{ opacity: 1, rotateY: 0, x: 0 }}
                  exit={{ opacity: 0, rotateY: 90, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Button variant="ghost" size="icon" onClick={() => setView("HUB")} className="rounded-full bg-black/50 backdrop-blur hover:bg-white/10 text-white">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="font-serif text-2xl font-bold tracking-widest text-white cursor-pointer drop-shadow-md hover:scale-105 transition-transform" onClick={() => setView("HUB")}>
              EMBER
            </div>
          </div>
          
          {view === "HUB" && (
            <div className="text-[10px] font-bold tracking-widest uppercase flex items-center px-3 py-1 bg-white/5 rounded-full backdrop-blur-md">
              <span className="text-white/50 mr-1">by</span>
              <span className="text-orange-500">e</span>
              <span className="text-white">x</span>
              <span className="text-orange-500">p</span>
              <span className="text-white ml-1">studio</span>
            </div>
          )}
        </header>

        {/* View Transitions */}
        <div className="flex-1 relative [transform-style:preserve-3d]">
          <AnimatePresence mode="wait">
            
            {/* HUB VIEW */}
            {view === "HUB" && (
              <motion.div 
                key="hub"
                initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotateX: -20 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-end pb-24 md:pb-32 pointer-events-auto"
              >
                <div className="text-center space-y-6 mb-12">
                  <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-white drop-shadow-2xl">
                    What are you craving?
                  </h1>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 px-6 w-full max-w-lg [perspective:1000px]">
                  <motion.div whileHover={{ rotateX: 10, rotateY: -10, scale: 1.05 }} className="flex-1">
                    <Button 
                      onClick={() => setView("AI")}
                      className="w-full h-16 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 text-white font-medium tracking-widest uppercase text-xs shadow-2xl"
                    >
                      Ask AI Sommelier
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ rotateX: 10, rotateY: 10, scale: 1.05 }} className="flex-1">
                    <Button 
                      onClick={() => setView("MENU")}
                      className="w-full h-16 rounded-2xl bg-ember-accent hover:bg-ember-accent/90 text-white font-medium tracking-widest uppercase text-xs shadow-xl shadow-ember-accent/20"
                    >
                      View Classic Menu
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* AI CONCIERGE VIEW */}
            {view === "AI" && (
              <motion.div 
                key="ai"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 m-auto w-full max-w-[600px] h-[80vh] max-h-[800px] bg-black/40 backdrop-blur-lg border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-y-auto pointer-events-auto shadow-[0_0_80px_rgba(0,0,0,0.8)] [transform-origin:center]"
              >
                <div className="max-w-md mx-auto space-y-8 pb-32">
                  <div>
                    <span className="text-ember-accent font-bold tracking-widest uppercase text-xs mb-2 block">
                      AI Sommelier
                    </span>
                    <h2 className="font-serif text-3xl text-white font-medium">Curate your meal</h2>
                  </div>

                  {/* AI Search */}
                  <motion.div whileHover={{ scale: 1.02, rotateX: 5 }} className="w-full relative shadow-2xl rounded-2xl bg-white/5 border border-white/10 p-2 focus-within:ring-2 focus-within:ring-ember-accent/50 transition-all">
                    <form onSubmit={handleSubmit} className="flex relative">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/50">
                        <Search className="h-5 w-5" />
                      </div>
                      <Input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={status === "loading"}
                        placeholder="Try: spicy dinner for two under Rs. 800"
                        className="pl-12 h-14 text-base border-0 shadow-none focus-visible:ring-0 bg-transparent text-white placeholder:text-white/30 disabled:opacity-50"
                      />
                      
                      <div className="absolute inset-y-0 right-2 flex items-center gap-2">
                        {status !== "idle" && (
                           <Button type="button" variant="ghost" size="icon" onClick={handleReset} className="h-10 w-10 text-white/50 hover:text-white hover:bg-white/10">
                             <X className="h-4 w-4" />
                           </Button>
                        )}
                        <Button type="submit" size="sm" disabled={status === "loading" || !query.trim()} className="h-10 px-4 rounded-xl bg-ember-accent hover:bg-ember-accent/90 text-white font-medium shadow-sm transition-all active:scale-95 disabled:opacity-50">
                          Find
                        </Button>
                      </div>
                    </form>
                  </motion.div>

                  {/* AI Loading State */}
                  <AnimatePresence>
                    {status === "loading" && (
                      <motion.div initial={{ opacity: 0, rotateX: -90 }} animate={{ opacity: 1, rotateX: 0 }} exit={{ opacity: 0, rotateX: 90 }}>
                        <AIStatusIndicator />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Success Results */}
                  <AnimatePresence>
                    {status !== "idle" && status !== "loading" && (
                      <motion.div initial={{ opacity: 0, y: 20, z: -50 }} animate={{ opacity: 1, y: 0, z: 0 }} className="flex flex-col gap-8 w-full">
                        {status === "success" && preferences && (
                          <div className="flex flex-wrap gap-2">
                            {preferences.spicy === true && <PreferenceChip label="Spicy" />}
                            {preferences.vegetarian === true && <PreferenceChip label="Vegetarian" />}
                            {(preferences.maxPrice ?? 0) > 0 && <PreferenceChip label={`Max ₹${preferences.maxPrice}`} />}
                          </div>
                        )}
                        <div className="pt-4 border-t border-white/10">
                          {status === "success" && matches.length > 0 && (
                            <h2 className="font-serif text-xl font-medium mb-6 text-white">Recommendations</h2>
                          )}
                          <RecommendationGrid 
                            items={matches} cart={cart} status={status} 
                            onAdd={handleAddToCart} onIncrease={handleAddToCart} onDecrease={handleDecrease} onRetry={handleReset} 
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* CLASSIC MENU VIEW (3D Overlay) */}
            {view === "MENU" && (
              <motion.div 
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 pointer-events-none flex flex-col justify-end items-center pb-32"
              >
                <div className="bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl">
                   <p className="text-white/70 font-medium tracking-widest text-xs uppercase animate-pulse">
                     Drag to explore the universe | Scroll to zoom
                   </p>
                </div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </div>

      {/* Sticky Bottom Cart (Global) */}
      <div className="pointer-events-auto relative z-50">
        <FloatingCart itemCount={cartItemCount} total={cartTotal} onClick={() => setIsCartOpen(true)} />
        <CartPanel 
          isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} total={cartTotal}
          onIncrease={handleAddToCart} onDecrease={handleDecrease}
        />
      </div>
    </main>
  );
}








