import { createFileRoute } from "@tanstack/react-router"

import { useState, useEffect, useRef } from "react";
import {
  IconBrandSlack,
  IconActivity,
  IconBug,
  IconUsers,
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
  IconCircleDot,
  IconPlus,
  IconDotsVertical,
  IconPlayerPlay,
  IconGitBranch,
  IconFlag,
  IconClock,
  IconHash,
  IconSend,
} from "@tabler/icons-react";


export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <HomePage />
  )
}

/* ─── Animated counter ─── */
function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const step = end / 60;
          const t = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(t); }
            else setCount(Math.floor(start));
          }, 16);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}
 
/* ─── Animated mesh background ─── */
function MeshBackground() {
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
      <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #16a34a, transparent 70%)" }} />
      <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
        style={{ background: "radial-gradient(circle, #22c55e, transparent 70%)" }} />
      <div className="absolute bottom-[10%] left-[30%] w-[700px] h-[400px] rounded-full opacity-10 blur-[130px]"
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
 
/* ─── Floating live feed pill ─── */
const feedItems = [
  { icon: IconBug, color: "text-red-400", text: "Bug #47 resolved by @alex" },
  { icon: IconCheck, color: "text-green-400", text: "Task 'Auth flow' completed" },
  { icon: IconMessage2, color: "text-sky-400", text: "New message in #frontend" },
  { icon: IconGitBranch, color: "text-purple-400", text: "PR merged: feature/onboarding" },
  { icon: IconFlag, color: "text-yellow-400", text: "Milestone 'v1.0 Beta' reached" },
];
 
function LiveFeed() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % feedItems.length); setVisible(true); }, 400);
    }, 2800);
    return () => clearInterval(t);
  }, []);
  const item = feedItems[idx];
  const Icon = item.icon;
  return (
    <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-green-500/20 bg-green-950/30 backdrop-blur-md text-sm transition-all duration-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <Icon size={14} className={item.color} />
      <span className="text-zinc-300">{item.text}</span>
    </div>
  );
}
 
/* ─── Mock project card ─── */
function ProjectCard({ name, members, tasks, bugs, color }) {
  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/60 backdrop-blur-sm p-4 hover:border-green-800/50 transition-colors group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
          <span className="text-sm font-semibold text-zinc-100">{name}</span>
        </div>
        <IconDotsVertical size={14} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
      </div>
      <div className="flex items-center gap-3 text-xs text-zinc-500">
        <span className="flex items-center gap-1"><IconUsers size={11} />{members} members</span>
        <span className="flex items-center gap-1"><IconCheck size={11} className="text-green-500" />{tasks} tasks</span>
        <span className="flex items-center gap-1"><IconBug size={11} className="text-red-400" />{bugs} bugs</span>
      </div>
      <div className="mt-3 h-1 rounded-full bg-zinc-800 overflow-hidden">
        <div className={`h-full rounded-full bg-gradient-to-r from-green-600 to-green-400`} style={{ width: `${(tasks / 20) * 100}%` }} />
      </div>
    </div>
  );
}
 
/* ─── Mock chat panel ─── */
function ChatPanel() {
  const messages = [
    { user: "sara", avatar: "S", color: "bg-violet-500", text: "Updated the wireframes for the dashboard ✓", time: "2m" },
    { user: "james", avatar: "J", color: "bg-sky-500", text: "Looks great! Let me push the new layout component", time: "1m" },
    { user: "you", avatar: "Y", color: "bg-green-600", text: "On it — PR will be up in 10 mins 🚀", time: "now" },
  ];
  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/70 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/60">
        <IconHash size={14} className="text-zinc-500" />
        <span className="text-sm font-medium text-zinc-300">frontend</span>
        <span className="ml-auto text-xs text-green-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />3 online</span>
      </div>
      <div className="p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className={`w-6 h-6 rounded-full ${m.color} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5`}>{m.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1.5 mb-0.5">
                <span className="text-xs font-semibold text-zinc-300">{m.user}</span>
                <span className="text-[10px] text-zinc-600">{m.time} ago</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 rounded-lg bg-zinc-900/80 border border-zinc-800/60 px-3 py-2">
          <span className="text-xs text-zinc-600 flex-1">Message #frontend…</span>
          <IconSend size={13} className="text-green-600" />
        </div>
      </div>
    </div>
  );
}
 
/* ─── Bug report mock ─── */
function BugPanel() {
  const bugs = [
    { id: "#041", title: "Modal z-index overlap on mobile", severity: "high", status: "open" },
    { id: "#042", title: "Auth token not refreshing silently", severity: "critical", status: "in progress" },
    { id: "#043", title: "Dark mode flicker on load", severity: "low", status: "resolved" },
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
function FeatureCard({ icon: Icon, title, desc, accent = "from-green-900/30 to-transparent" }) {
  return (
    <div className={`relative rounded-2xl border border-zinc-800/60 bg-gradient-to-b ${accent} p-6 hover:border-green-800/60 transition-all duration-300 group overflow-hidden`}>
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
function Testimonial({ quote, name, role, company }) {
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
 
/* ─── Nav ─── */
function Navbar() {
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
 
/* ─── Main App ─── */
function HomePage() {
  return (
    <div className="min-h-screen text-zinc-100" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes slide-up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fade-in { from{opacity:0} to{opacity:1} }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.7s ease both; }
        .animate-fade-in { animation: fade-in 0.6s ease both; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #09090b; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 3px; }
      `}</style>
 
      <MeshBackground />
      <Navbar />
 
      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-6 text-center relative">
        {/* badge */}
        <div className="animate-slide-up mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-green-800/60 bg-green-950/40 text-green-400">
            <IconSparkles size={12} />
            Now in public beta — free for teams up to 5
          </span>
        </div>
 
        <h1 className="animate-slide-up delay-100 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl mx-auto mb-6">
          The{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-500">
              realtime workspace
            </span>
            <span className="absolute -inset-1 blur-2xl opacity-30 bg-gradient-to-r from-green-500 to-green-600 rounded-full" />
          </span>{" "}
          your team actually needs
        </h1>
 
        <p className="animate-slide-up delay-200 text-base sm:text-lg text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
          Projects, tasks, live chat, activity feeds, and bug tracking — all in one place.
          Invite your team and ship faster together.
        </p>
 
        <div className="animate-slide-up delay-300 flex flex-col sm:flex-row items-center gap-3 mb-10">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-zinc-950 font-semibold text-sm hover:bg-green-400 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20">
            Start your first project <IconArrowRight size={16} />
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700/60 text-zinc-300 text-sm hover:border-zinc-600 hover:text-zinc-100 transition-all">
            <IconPlayerPlay size={14} className="text-green-400" /> Watch demo
          </button>
        </div>
 
        <div className="animate-fade-in delay-400">
          <LiveFeed />
        </div>
 
        {/* floating ui preview */}
        <div className="animate-slide-up delay-500 mt-16 w-full max-w-5xl mx-auto relative">
          {/* glow under preview */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-24 blur-3xl opacity-25 bg-green-500 rounded-full" />
 
          <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/60">
            {/* window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/60 bg-zinc-900/40">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-zinc-500 font-mono">app.planitapp.io / acme-corp</span>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* sidebar */}
              <div className="hidden md:block border-r border-zinc-800/60 p-4 space-y-1">
                <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-3 px-2">Projects</p>
                {[
                  { name: "acme-corp", color: "bg-green-500", active: true },
                  { name: "mobile-app", color: "bg-sky-500" },
                  { name: "backend-api", color: "bg-purple-500" },
                ].map((p, i) => (
                  <div key={i} className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-xs cursor-pointer transition-colors ${p.active ? "bg-green-950/50 text-green-300" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40"}`}>
                    <span className={`w-2 h-2 rounded-full ${p.color}`} />
                    {p.name}
                  </div>
                ))}
                <div className="pt-3">
                  <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-2 px-2">Channels</p>
                  {["#general", "#frontend", "#bugs"].map(c => (
                    <div key={c} className="px-2 py-1.5 text-xs text-zinc-600 hover:text-zinc-400 cursor-pointer rounded-lg hover:bg-zinc-800/30 transition-colors flex items-center gap-1.5">
                      <IconHash size={11} />{c.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
 
              {/* main area */}
              <div className="col-span-2 p-4 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">acme-corp</h3>
                    <p className="text-[11px] text-zinc-500">4 members · Sprint 3</p>
                  </div>
                  <button className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-green-500/10 text-green-400 border border-green-800/40 hover:bg-green-500/20 transition-colors">
                    <IconPlus size={11} /> Add task
                  </button>
                </div>
                <ProjectCard name="Auth & Onboarding" members={3} tasks={14} bugs={1} color="bg-green-500" />
                <ProjectCard name="Dashboard UI" members={2} tasks={9} bugs={2} color="bg-sky-500" />
                <ChatPanel />
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── STATS ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { end: 12000, suffix: "+", label: "Teams onboarded" },
            { end: 99, suffix: ".9%", label: "Uptime SLA" },
            { end: 3, suffix: "ms", label: "Avg latency" },
            { end: 4500, suffix: "+", label: "Projects shipped" },
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
            <span className="text-xs font-semibold uppercase tracking-widest text-green-500 mb-3 block">Everything you need</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">Built for teams who move fast</h2>
            <p className="text-zinc-500 text-base max-w-xl mx-auto">Every feature is designed to reduce friction and keep your team aligned — without the noise.</p>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard icon={IconLayoutKanban} title="Project Workspaces" desc="Create isolated projects, invite members with granular roles, and organize work into milestones and sprints." />
            <FeatureCard icon={IconActivity} title="Live Activity Feed" desc="Real-time stream of everything happening across your project — commits, task updates, comments, and more." accent="from-sky-900/20 to-transparent" />
            <FeatureCard icon={IconMessage2} title="Built-in Chat" desc="Channel-based messaging directly inside your project. No need to context-switch to Slack." accent="from-violet-900/20 to-transparent" />
            <FeatureCard icon={IconBug} title="Bug Reporting" desc="Capture, triage, and track bugs with severity levels, assignees, and reproduction steps. Ship fixes faster." accent="from-red-900/20 to-transparent" />
            <FeatureCard icon={IconBell} title="Smart Notifications" desc="Get notified about what matters. Intelligent filtering surfaces the signal, not the noise." accent="from-yellow-900/20 to-transparent" />
            <FeatureCard icon={IconShield} title="Permissions & Roles" desc="Owner, admin, member, and guest roles let you control exactly who sees and touches what." accent="from-teal-900/20 to-transparent" />
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
                  <IconCheck size={14} className="text-green-500 flex-shrink-0" />
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
            <h2 className="text-3xl font-bold text-zinc-100 mb-3">Teams love planitapp</h2>
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
                      <IconCheck size={13} className="text-green-500 flex-shrink-0" />{f}
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
