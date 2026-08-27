import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PreferenceChipProps {
  label: string;
  icon?: string;
}

export function PreferenceChip({ label, icon }: PreferenceChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
        "bg-ember-accent/10 text-ember-accent text-sm font-medium border border-ember-accent/20"
      )}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </motion.div>
  );
}
