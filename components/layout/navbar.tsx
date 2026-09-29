import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-[100] bg-background/60 backdrop-blur-lg border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-3 group">
          <div className="font-serif text-2xl font-bold tracking-widest text-foreground group-hover:text-ember-accent transition-colors">
            EMBER
          </div>
          <div className="text-[10px] font-bold tracking-widest uppercase flex items-center opacity-80">
            <span className="text-ember-text-secondary mr-1">by</span>
            <span className="text-orange-500">e</span>
            <span className="text-orange-500">x</span>
            <span className="text-orange-500">p</span>
            <span className="text-foreground ml-1">studio</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#story" className="text-sm font-medium tracking-widest uppercase text-ember-text-secondary hover:text-foreground transition-colors">Story</Link>
          <Link href="#concierge" className="text-sm font-medium tracking-widest uppercase text-ember-text-secondary hover:text-foreground transition-colors">AI Concierge</Link>
          <Link href="#menu" className="text-sm font-medium tracking-widest uppercase text-ember-text-secondary hover:text-foreground transition-colors">Menu</Link>
          <Button className="rounded-full px-6 bg-foreground text-background hover:bg-foreground/90 font-bold uppercase tracking-wider text-xs">
            Reserve
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
