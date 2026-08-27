import * as React from "react";
import { MenuItem } from "@/types";
import { FoodCard } from "./food-card";
import { SearchX, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface RecommendationGridProps {
  items: MenuItem[];
  cart: { item: MenuItem; quantity: number }[];
  onAdd: (item: MenuItem) => void;
  onIncrease: (item: MenuItem) => void;
  onDecrease: (item: MenuItem) => void;
  onRetry?: () => void;
  status: "idle" | "loading" | "success" | "error";
}

export function RecommendationGrid({ items, cart, onAdd, onIncrease, onDecrease, onRetry, status }: RecommendationGridProps) {
  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <RefreshCcw className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-xl font-medium mb-2">Something went wrong</h3>
        <p className="text-ember-text-secondary mb-6 max-w-sm">
          We had trouble processing your request. Please try again.
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            Try Again
          </Button>
        )}
      </div>
    );
  }

  if (status === "success" && items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 px-4 text-center"
      >
        <div className="w-16 h-16 bg-black/5 text-ember-text-secondary rounded-full flex items-center justify-center mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-xl font-medium mb-2">No exact matches</h3>
        <p className="text-ember-text-secondary mb-6 max-w-sm">
          We couldn&apos;t find exactly what you were looking for. Try adjusting your request or removing some filters.
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            Clear Search
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      <AnimatePresence>
        {status === "success" && items.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-24"
          >
            {items.map((item) => {
              const cartItem = cart.find(c => c.item.id === item.id);
              return (
                <FoodCard 
                  key={item.id} 
                  item={item} 
                  quantity={cartItem?.quantity || 0}
                  onAdd={onAdd} 
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
