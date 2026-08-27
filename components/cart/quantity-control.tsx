import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function QuantityControl({ quantity, onIncrease, onDecrease }: QuantityControlProps) {
  return (
    <div className="flex items-center justify-between bg-ember-accent/10 rounded-md border border-ember-accent/20 h-10 w-full overflow-hidden">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onDecrease}
        className="h-full w-10 text-ember-accent hover:bg-ember-accent/20 rounded-none rounded-l-md"
      >
        <Minus className="w-4 h-4" />
      </Button>
      
      <div className="flex-1 text-center font-medium text-ember-accent relative overflow-hidden h-full flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={quantity}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            {quantity}
          </motion.span>
        </AnimatePresence>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onIncrease}
        className="h-full w-10 text-ember-accent hover:bg-ember-accent/20 rounded-none rounded-r-md"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}
