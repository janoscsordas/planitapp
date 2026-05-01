import { createFileRoute, Link } from "@tanstack/react-router"

import {
  IconActivity,
  IconBug,
  IconCheck,
  IconArrowRight,
  IconBolt,
  IconMessage2,
  IconLayoutKanban,
  IconChevronRight,
  IconStar,
  IconSparkles,
  IconShield,
  IconBell,
  IconPlayerPlay,
} from "@tabler/icons-react";
import LiveFeed from "#/components/homepage/live-feed";
import Counter from "#/components/homepage/animated-counter";
import MeshBackground from "#/components/homepage/animated-mesh-background";
import Navbar from "#/components/homepage/navbar";
import FloatingUIPreview, { ChatPanel } from "#/components/homepage/floating-ui-preview";


export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <HomePage />
  )
}

/* ─── Bug report mock ─── */
function BugPanel() {
  type BugStatus = "open" | "in progress" | "resolved";
  type BugSeverity = "high" | "critical" | "low";
  
  const bugs = [
    { id: "#041", title: "Modal z-index overlap on mobile", severity: "high" as BugSeverity, status: "open" as BugStatus },
    { id: "#042", title: "Auth token not refreshing silently", severity: "critical" as BugSeverity, status: "in progress" as BugStatus },
    { id: "#043", title: "Dark mode flicker on load", severity: "low" as BugSeverity, status: "resolved" as BugStatus },
  ];
  const sev = { high: "text-orange-400 bg-orange-400/10", critical: "text-red-400 bg-red-400/10", low: "text-zinc-400 bg-zinc-400/10" };
  const stat = { open: "text-yellow-400", "in progress": "text-sky-400", resolved: "text-green-400" };
  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/70 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/60">
        <IconBug size={14} className="text-red-400" />
        <span className="text-sm font-medium text-zinc-300">Bug Tracker</span>
        <span className="ml-auto text-xs rounded-full px-2 py-0.5 bg-red-500/10 text-red-400">2 open</span>
      </div>
      <div className="divide-y divide-zinc-800/40">
        {bugs.map((b, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <span className="text-[10px] text-zinc-600 font-mono w-10">{b.id}</span>
            <span className="text-xs text-zinc-300 flex-1 truncate">{b.title}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${sev[b.severity]}`}>{b.severity}</span>
            <span className={`text-[10px] ${stat[b.status]}`}>{b.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
 
/* ─── Feature card ─── */
function FeatureCard({ icon: Icon, title, desc, accent = "from-green-900/30 to-transparent" }: { icon: any; title: string; desc: string; accent?: string }) {
  return (
    <div className={`relative rounded-2xl border border-zinc-800/60 bg-linear-to-b ${accent} p-6 hover:border-green-800/60 transition-all duration-300 group overflow-hidden`}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(34,197,94,0.06), transparent 60%)" }} />
      <div className="w-10 h-10 rounded-xl bg-green-950/80 border border-green-900/50 flex items-center justify-center mb-4 group-hover:border-green-700/60 transition-colors">
        <Icon size={18} className="text-green-400" />
      </div>
      <h3 className="text-base font-semibold text-zinc-100 mb-2">{title}</h3>
      <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
    </div>
  );
}
 
/* ─── Testimonial ─── */
function Testimonial({ quote, name, role, company }: { quote: string; name: string; role: string; company: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800/50 bg-zinc-950/50 p-6 flex flex-col gap-4">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => <IconStar key={i} size={13} className="text-green-500 fill-green-500" />)}
      </div>
      <p className="text-sm text-zinc-400 leading-relaxed italic">"{quote}"</p>
      <div>
        <p className="text-sm font-semibold text-zinc-200">{name}</p>
        <p className="text-xs text-zinc-500">{role} · {company}</p>
      </div>
    </div>
  );
}
 
/* ─── Main App ─── */
function HomePage() {
  return (
    <div className="min-h-screen text-zinc-100" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
 
      <MeshBackground />
      <Navbar />
 
      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-48 pb-16 px-6 text-center relative">
        {/* badge */}
        <div className="animate-slide-up mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-green-800/60 bg-green-950/40 text-green-400">
            <IconSparkles size={12} />
            Elérhető Publikus Bétában - 3 projekt ingyen
          </span>
        </div>
 
        <h1 className="animate-slide-up delay-100 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl mx-auto mb-6">
          A{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-green-300 via-green-400 to-green-500">
              valós idejű feladatkezelő
            </span>
            <span className="absolute -inset-1 blur-2xl opacity-30 bg-linear-to-r from-green-500 to-green-600 rounded-full" />
          </span>{" "}
          amelyre a csapatodnak szüksége van.
        </h1>
 
        <p className="animate-slide-up delay-200 text-base sm:text-lg text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
          Projektek, feladatok, élő chat, aktivitás ablakok, és bug tracking — mindez egy helyen.
          Hívd meg a csapatod és lássatok munkához most.
        </p>
 
        <div className="animate-slide-up delay-300 flex flex-col sm:flex-row items-center gap-3 mb-10">
          <Link to="/register">
            <button className="cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-zinc-950 font-semibold text-sm hover:bg-green-400 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20">
              Kezdj bele <IconArrowRight size={16} />
            </button>
          </Link>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700/60 text-zinc-300 text-sm hover:border-zinc-600 hover:text-zinc-100 transition-all">
            <IconPlayerPlay size={14} className="text-green-400" /> Demo megtekintése
          </button>
        </div>
 
        <div className="animate-fade-in delay-400">
          <LiveFeed />
        </div>

        <FloatingUIPreview />
      </section>
 
      {/* ── STATS ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { end: 120, suffix: "+", label: "Projektet készítettek" },
            { end: 99, suffix: ".9%", label: "Elérhetőségi szint (SLA)" },
            { end: 30, suffix: "ms", label: "Átlagos válaszidő" },
            { end: 45, suffix: "+", label: "Projektet fejeztek be" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-green-400 mb-1" style={{ fontFamily: "DM Mono, monospace" }}>
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <p className="text-sm text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── FEATURES ── */}
      <section className="py-24 px-6" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-green-500 mb-3 block">Minden, amire szükséged van</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">Olyan csapatoknak készült, akik gyorsan haladnak</h2>
            <p className="text-zinc-500 text-base max-w-xl mx-auto">Minden elérhető funkció, úgy készült, hogy a csapat tagjai könnyedén tudjanak dolgozni.</p>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard icon={IconLayoutKanban} title="Projektek" desc="Izolált projektek létrehozása, tagok meghívása különböző szerepkörökkel és a feladatok menedzselése." />
            <FeatureCard icon={IconActivity} title="Élő Aktivitás Panel" desc="Valós-Idejű történések a projektek bármely pontjáról, legyen ez feladat készítés, módosítás, elvégzés stb." accent="from-sky-900/20 to-transparent" />
            <FeatureCard icon={IconMessage2} title="Beépített Chat Szobák" desc="Szoba alapú üzenetküldés projekten belül. Nincs szükség külsős app-okra, mint a Slack." accent="from-violet-900/20 to-transparent" />
            <FeatureCard icon={IconBug} title="Probléma Jelentés" desc="Probléma kezelés fontossági." accent="from-red-900/20 to-transparent" />
            <FeatureCard icon={IconBell} title="Smart Notifications" desc="Get notified about what matters. Intelligent filtering surfaces the signal, not the noise." accent="from-yellow-900/20 to-transparent" />
            <FeatureCard icon={IconShield} title="Engedélyek & Szerepek" desc="Tulajdonos, adming és tag szerepekkel beállíthatod, hogy ki és mit tud csinálni a projektedben." accent="from-teal-900/20 to-transparent" />
          </div>
        </div>
      </section>
 
      {/* ── DEEP DIVE: BUG + ACTIVITY ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-green-500 mb-3 block">Bug tracking</span>
            <h2 className="text-3xl font-bold text-zinc-100 mb-4 leading-tight">From report to fix, in record time</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">Log bugs directly from your project. Assign severity, link to tasks or PRs, and track resolution — all without leaving planitapp.</p>
            <ul className="space-y-3">
              {["Severity levels: low, medium, high, critical", "Assign bugs to team members instantly", "Link bugs to git commits and tasks", "Auto-close bugs on PR merge"].map((t, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-zinc-400">
                  <IconCheck size={14} className="text-green-500 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-float">
            <BugPanel />
          </div>
        </div>
      </section>
 
      {/* ── ACTIVITY + CHAT ── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 animate-float" style={{ animationDelay: "1s" }}>
            <ChatPanel />
          </div>
          <div className="order-1 md:order-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-green-500 mb-3 block">Team chat</span>
            <h2 className="text-3xl font-bold text-zinc-100 mb-4 leading-tight">Context lives where the work happens</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">Channels scoped to your project keep conversations relevant. Mention teammates, share files, and stay unblocked — without switching tabs.</p>
            <a href="#" className="inline-flex items-center gap-1.5 text-sm text-green-400 hover:text-green-300 transition-colors font-medium">
              See all communication features <IconChevronRight size={15} />
            </a>
          </div>
        </div>
      </section>
 
      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-100 mb-3">A csapatok imádják a Planitapp-ot</h2>
            <p className="text-zinc-500 text-sm">Trusted by engineering teams at fast-moving companies</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Testimonial quote="We replaced Jira, Linear, and Slack with planitapp. Our stand-ups went from 30 minutes to 10." name="Mia Johansson" role="Engineering Lead" company="Helion Labs" />
            <Testimonial quote="The live activity feed is a game-changer. I know what's happening in my team without anyone needing to report it." name="Carlos Reyes" role="CTO" company="Stackwire" />
            <Testimonial quote="Bug triage used to be chaos. Now every issue is tracked, assigned, and resolved in planitapp. Love it." name="Priya Nair" role="QA Lead" company="Driftworks" />
          </div>
        </div>
      </section>
 
      {/* ── PRICING ── */}
      <section className="py-24 px-6" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-zinc-100 mb-3">Simple, transparent pricing</h2>
            <p className="text-zinc-500 text-sm">Start free. Scale when you're ready.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name: "Starter", price: "Free", sub: "Forever, up to 5 members",
                features: ["3 projects", "7-day activity history", "Community support", "Basic bug tracking"],
                cta: "Get started", highlight: false,
              },
              {
                name: "Team", price: "$18", sub: "per seat / month",
                features: ["Unlimited projects", "90-day history", "Priority support", "Advanced bug tracking", "Custom roles & permissions", "GitHub & GitLab integrations"],
                cta: "Start free trial", highlight: true,
              },
              {
                name: "Enterprise", price: "Custom", sub: "Volume pricing available",
                features: ["Everything in Team", "SSO / SAML", "Audit logs", "SLA guarantee", "Dedicated success manager", "Custom integrations"],
                cta: "Contact sales", highlight: false,
              },
            ].map((plan, i) => (
              <div key={i} className={`relative rounded-2xl border p-6 flex flex-col ${plan.highlight ? "border-green-600/60 bg-green-950/20 shadow-xl shadow-green-900/20" : "border-zinc-800/60 bg-zinc-950/40"}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-green-500 text-zinc-950">Most popular</span>
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-zinc-400 mb-1">{plan.name}</p>
                  <p className="text-3xl font-bold text-zinc-100">{plan.price}</p>
                  <p className="text-xs text-zinc-500 mt-1">{plan.sub}</p>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-zinc-400">
                      <IconCheck size={13} className="text-green-500 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95 ${plan.highlight ? "bg-green-500 text-zinc-950 hover:bg-green-400" : "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── CTA ── */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 blur-3xl opacity-15 rounded-full" style={{ background: "radial-gradient(ellipse, #22c55e, transparent 70%)" }} />
          <div className="relative">
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6 leading-tight">
              Your team deserves<br />a better way to work.
            </h2>
            <p className="text-zinc-400 text-base mb-8 max-w-md mx-auto">Set up your first project in under 2 minutes. No credit card required.</p>
            <button className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-green-500 text-zinc-950 font-bold text-base hover:bg-green-400 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-green-500/30">
              Create your workspace <IconArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
 
      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-800/40 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center">
                <IconBolt size={12} className="text-zinc-950 stroke-[2.5]" />
              </div>
              <span className="font-bold text-zinc-300 tracking-tight text-sm">planit<span className="text-green-400">app</span></span>
            </div>
            <div className="flex items-center gap-6 text-xs text-zinc-600">
              {["Privacy", "Terms", "Status", "Changelog", "Blog"].map(l => (
                <a key={l} href="#" className="hover:text-zinc-400 transition-colors">{l}</a>
              ))}
            </div>
            <p className="text-xs text-zinc-700">© 2025 planitapp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
