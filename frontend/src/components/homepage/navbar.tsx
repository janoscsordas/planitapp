import { IconBolt } from "@tabler/icons-react";
import { useEffect, useState } from "react";

/* ─── Nav ─── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center">
            <IconBolt size={15} className="text-zinc-950 stroke-[2.5]" />
          </div>
          <span className="font-bold text-zinc-100 tracking-tight">planit<span className="text-green-400">app</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          {["Features", "Pricing", "Changelog", "Docs"].map(l => (
            <a key={l} href="#" className="hover:text-zinc-100 transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors hidden sm:block">Sign in</a>
          <button className="text-sm font-semibold px-4 py-2 rounded-lg bg-green-500 text-zinc-950 hover:bg-green-400 transition-colors">
            Get started
          </button>
        </div>
      </div>
    </nav>
  );
}