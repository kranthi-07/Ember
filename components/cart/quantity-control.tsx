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
    <div className="flex items-center justify-between bg-black/40 backdrop-blur-md rounded-full border border-white/20 h-10 w-full overflow-hidden shadow-inner">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onDecrease}
        className="h-full w-10 text-white/70 hover:text-white hover:bg-white/10 rounded-none rounded-l-full transition-colors"
      >
        <Minus className="w-4 h-4" />
      </Button>
      
      <div className="flex-1 text-center font-medium text-white relative overflow-hidden h-full flex items-center justify-center">
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
        className="h-full w-10 text-white/70 hover:text-white hover:bg-white/10 rounded-none rounded-r-full transition-colors"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}
