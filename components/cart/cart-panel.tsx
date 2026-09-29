import * as React from "react";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/types";
import { QuantityControl } from "./quantity-control";

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { item: MenuItem; quantity: number }[];
  total: number;
  onIncrease: (item: MenuItem) => void;
  onDecrease: (item: MenuItem) => void;
}

export function CartPanel({ isOpen, onClose, cart, total, onIncrease, onDecrease }: CartPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Premium Right Side Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-black/50 backdrop-blur-2xl z-[70] flex flex-col shadow-2xl border-l border-white/10 overflow-hidden text-white"
          >
            {/* Elegant Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/10">
              <div>
                <span className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase block mb-1">Ember</span>
                <h2 className="font-serif text-3xl font-light tracking-tight text-white">Your Order</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors h-12 w-12">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-2">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/40">
                  <p className="text-lg font-serif italic mb-6">Your palate awaits...</p>
                  <Button variant="outline" className="rounded-full border-white/20 hover:bg-white/10 hover:text-white uppercase tracking-widest text-xs px-8" onClick={onClose}>
                    Explore Menu
                  </Button>
                </div>
              ) : (
                cart.map((cartItem) => (
                  <div key={cartItem.item.id} className="flex items-center gap-6 py-6 border-b border-white/5 group">
                    {cartItem.item.image ? (
                      <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-2xl border border-white/10 group-hover:scale-105 transition-transform duration-500">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={cartItem.item.image} alt={cartItem.item.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-serif font-bold text-white/50 text-2xl">
                        {cartItem.item.name.charAt(0)}
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xl font-medium text-white truncate">{cartItem.item.name}</h4>
                      <div className="text-ember-accent font-medium text-sm mt-1 mb-3 font-serif italic">
                        ₹{cartItem.item.price}
                      </div>
                      <div className="w-28">
                        <QuantityControl 
                          quantity={cartItem.quantity}
                          onIncrease={() => onIncrease(cartItem.item)}
                          onDecrease={() => onDecrease(cartItem.item)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Premium Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-black/40 backdrop-blur-md border-t border-white/10 pb-12">
                <div className="flex justify-between items-end mb-8">
                  <span className="text-white/40 font-medium text-xs tracking-[0.2em] uppercase mb-1">Total Amount</span>
                  <span className="font-serif font-light text-4xl text-white">₹{total}</span>
                </div>
                <Button className="w-full h-16 text-sm tracking-[0.2em] uppercase font-bold rounded-full bg-white hover:bg-white/90 text-black shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                  Confirm Order <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
