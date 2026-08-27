import * as React from "react";
import { X } from "lucide-react";
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 inset-x-0 w-full h-[85vh] max-h-[800px] bg-background rounded-t-3xl z-[70] flex flex-col shadow-float overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-ember-border">
              <h2 className="font-serif text-2xl font-bold">Your Order</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-ember-text-secondary">
                  <p>Your cart is empty.</p>
                  <Button variant="outline" className="mt-4" onClick={onClose}>
                    Browse Menu
                  </Button>
                </div>
              ) : (
                cart.map((cartItem) => (
                  <div key={cartItem.item.id} className="flex items-center gap-4">
                    {cartItem.item.image ? (
                      <img src={cartItem.item.image} alt={cartItem.item.name} className="w-16 h-16 rounded-xl object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-ember-accent/10 flex items-center justify-center font-serif font-bold text-ember-accent text-xl">
                        {cartItem.item.name.charAt(0)}
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{cartItem.item.name}</h4>
                      <div className="text-ember-accent font-medium text-sm mt-1">
                        ₹{cartItem.item.price}
                      </div>
                    </div>

                    <div className="w-24">
                      <QuantityControl 
                        quantity={cartItem.quantity}
                        onIncrease={() => onIncrease(cartItem.item)}
                        onDecrease={() => onDecrease(cartItem.item)}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-ember-surface border-t border-ember-border pb-safe">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-ember-text-secondary font-medium">Subtotal</span>
                  <span className="font-bold text-xl">₹{total}</span>
                </div>
                <Button className="w-full h-14 text-lg font-bold rounded-xl bg-ember-accent hover:bg-ember-accent/90 text-white">
                  Place Order
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
