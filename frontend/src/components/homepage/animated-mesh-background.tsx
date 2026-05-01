/* ─── Animated mesh background ─── */
export default function MeshBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* base dark */}
      <div className="absolute inset-0 bg-[#050a06]" />
 
      {/* grid lines */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #22c55e 1px, transparent 1px),
            linear-gradient(to bottom, #22c55e 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
 
      {/* perspective grid floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[45vh] opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #4ade80 1px, transparent 1px),
            linear-gradient(to bottom, #4ade80 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: "perspective(600px) rotateX(60deg)",
          transformOrigin: "bottom center",
        }}
      />
 
      {/* glow orbs */}
      <div className="absolute top-[-10%] left-[15%] w-150 h-150 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #16a34a, transparent 70%)" }} />
      <div className="absolute top-[30%] right-[-5%] w-125 h-125 rounded-full opacity-15 blur-[100px]"
        style={{ background: "radial-gradient(circle, #22c55e, transparent 70%)" }} />
      <div className="absolute bottom-[10%] left-[30%] w-175 h-175 rounded-full opacity-10 blur-[130px]"
        style={{ background: "radial-gradient(circle, #15803d, transparent 70%)" }} />
 
      {/* subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}