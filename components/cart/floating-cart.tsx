import * as React from "react";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingCartProps {
  itemCount: number;
  total: number;
  onClick: () => void;
}

export function FloatingCart({ itemCount, total, onClick }: FloatingCartProps) {
  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 inset-x-0 mx-auto w-[calc(100%-32px)] max-w-sm z-50 pointer-events-auto"
        >
          <div 
            onClick={onClick}
            className="bg-foreground text-background shadow-float rounded-2xl p-4 flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-background/80" />
                <motion.div 
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-ember-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </motion.div>
              </div>
              <span className="font-medium text-sm">View Order</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex flex-col text-right">
                <span className="text-xs text-background/60 font-medium">Total</span>
                <motion.span 
                  key={total}
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="font-bold text-sm"
                >
                  ₹{total}
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
