import * as React from "react";
import { MenuItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Utensils, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { QuantityControl } from "@/components/cart/quantity-control";

interface FoodCardProps {
  item: MenuItem;
  quantity?: number;
  onAdd: (item: MenuItem) => void;
  onIncrease?: (item: MenuItem) => void;
  onDecrease?: (item: MenuItem) => void;
}

export function FoodCard({ item, quantity = 0, onAdd, onIncrease, onDecrease }: FoodCardProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col bg-ember-surface rounded-xl shadow-card overflow-hidden border border-ember-border group"
    >
      {/* Image Area */}
      <div className="relative h-48 w-full bg-black/5 flex items-center justify-center overflow-hidden">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-ember-accent/5 text-ember-accent/40">
            <Utensils className="w-12 h-12 mb-2 opacity-50" />
            <span className="text-xs font-medium uppercase tracking-wider">{item.category}</span>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.vegetarian && (
            <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded shadow-sm">
              VEG
            </span>
          )}
          {item.spicy && (
            <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-1 rounded shadow-sm">
              SPICY
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-lg font-bold text-foreground leading-tight">{item.name}</h3>
          <span className="font-medium text-ember-accent">₹{item.price}</span>
        </div>
        
        <p className="text-sm text-ember-text-secondary line-clamp-2 mb-4 flex-1">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {item.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs text-ember-text-secondary bg-black/5 px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Action */}
        <div className="h-10 w-full mt-auto">
          {quantity > 0 && onIncrease && onDecrease ? (
            <QuantityControl 
              quantity={quantity} 
              onIncrease={() => onIncrease(item)} 
              onDecrease={() => onDecrease(item)} 
            />
          ) : (
            <Button 
              onClick={() => onAdd(item)}
              className="w-full justify-between group-hover:bg-ember-accent group-hover:text-white transition-colors h-full"
              variant="outline"
            >
              <span>Add to order</span>
              <Plus className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
