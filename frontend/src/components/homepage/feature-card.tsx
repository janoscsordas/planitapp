/* ─── Feature card ─── */
export default function FeatureCard({
  icon: Icon,
  title,
  desc,
  accent = "from-green-900/30 to-transparent",
}: {
  icon: any;
  title: string;
  desc: string;
  accent?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-zinc-800/60 bg-linear-to-b ${accent} p-6 hover:border-green-800/60 transition-all duration-300 group overflow-hidden`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(34,197,94,0.06), transparent 60%)",
        }}
      />
      <div className="w-10 h-10 rounded-xl bg-green-950/80 border border-green-900/50 flex items-center justify-center mb-4 group-hover:border-green-700/60 transition-colors">
        <Icon size={18} className="text-green-400" />
      </div>
      <h3 className="text-base font-semibold text-zinc-100 mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}