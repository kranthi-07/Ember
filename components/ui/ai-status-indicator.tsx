import { Loader2 } from "lucide-react";

export function AIStatusIndicator() {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm">
      <Loader2 className="w-5 h-5 animate-spin text-ember-accent" />
      <span className="tracking-wide">AI Sommelier is curating your perfect meal...</span>
    </div>
  );
}
