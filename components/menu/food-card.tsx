import * as React from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/types";
import { motion } from "framer-motion";

interface FoodCardProps {
  item: MenuItem;
  quantity?: number;
  onAdd: (item: MenuItem) => void;
  onIncrease: (item: MenuItem) => void;
  onDecrease: (item: MenuItem) => void;
}

export function FoodCard({ item, quantity = 0, onAdd, onIncrease, onDecrease }: FoodCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 overflow-hidden transition-all shadow-xl group"
    >
      {item.image && (
        <div className="relative w-full h-40 overflow-hidden bg-black/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          {item.spicy && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm shadow-md">
              Spicy
            </div>
          )}
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="font-serif text-lg font-medium text-white leading-tight">{item.name}</h3>
          <span className="font-serif text-lg font-bold text-ember-accent">₹{item.price}</span>
        </div>
        <p className="text-white/50 text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
          {item.description}
        </p>

        {quantity === 0 ? (
          <Button 
            onClick={() => onAdd(item)}
            className="w-full bg-white/10 hover:bg-ember-accent text-white border-0 transition-colors font-bold tracking-widest text-[10px] uppercase h-10"
          >
            Add to Order
          </Button>
        ) : (
          <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-full h-10 px-1 overflow-hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDecrease(item)}
              className="h-8 w-8 rounded-full hover:bg-white/10 text-white"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="font-bold text-white w-8 text-center">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onIncrease(item)}
              className="h-8 w-8 rounded-full hover:bg-white/10 text-white"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
