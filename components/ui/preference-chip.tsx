export function PreferenceChip({ label, icon }: { label: string; icon?: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ember-accent/20 border border-ember-accent/30 text-xs font-medium text-white shadow-lg backdrop-blur-md">
      {icon && <span>{icon}</span>}
      <span className="tracking-wide capitalize">{label}</span>
    </div>
  );
}
