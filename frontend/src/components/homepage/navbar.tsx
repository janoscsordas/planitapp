import { authClient } from "#/lib/auth-client";
import { IconBolt } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import UserAvatar from "../user/user-avatar";
import { Button } from "../ui/button";

/* ─── Nav ─── */
export default function Navbar() {
  const { data } = authClient.useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const abortSignal = new AbortController();
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { signal: abortSignal.signal });
    return () => abortSignal.abort();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center">
            <IconBolt size={15} className="text-zinc-950 stroke-[2.5]" />
          </div>
          <span className="font-bold text-zinc-100 tracking-tight">
            Planit<span className="text-green-400">App</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          {[
            { label: "Funkciók", href: "#features" },
            { label: "Árazás", href: "#pricing" },
            { label: "GYIK", href: "#faq" },
            { label: "Dokumentáció", href: "#docs" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className="hover:text-zinc-100 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {data ? (
            <>
              <Link
                to="/projects"
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors hidden sm:block"
              >
                <Button variant="outline" size="sm" className="cursor-pointer">
                  Projektek
                </Button>
              </Link>
              <UserAvatar user={data.user} />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors hidden sm:block"
              >
                Bejelentkezés
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold px-4 py-2 rounded-lg bg-green-500 text-zinc-950 hover:bg-green-400 transition-colors"
              >
                Kezdj bele!
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
