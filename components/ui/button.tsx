import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ember-accent disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          {
            "bg-ember-accent text-white hover:bg-ember-accent/90 shadow-sm": variant === "default",
            "border border-ember-border bg-ember-surface text-foreground hover:bg-black/5": variant === "outline",
            "hover:bg-black/5 text-foreground": variant === "ghost",
            "bg-black/5 text-foreground hover:bg-black/10": variant === "secondary",
            "h-10 px-4 py-2": size === "default",
            "h-8 rounded-md px-3 text-xs": size === "sm",
            "h-12 rounded-md px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
