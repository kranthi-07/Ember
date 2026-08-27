import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function AIStatusIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="flex items-center gap-3 text-ember-text-secondary my-6"
    >
      <motion.div
        animate={{ 
          rotate: [0, 15, -15, 0],
          scale: [1, 1.2, 1] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <Sparkles className="w-5 h-5 text-ember-accent" />
      </motion.div>
      <span className="text-sm font-medium tracking-wide">
        Understanding your request...
      </span>
    </motion.div>
  );
}
