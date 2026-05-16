import {
  IconBug,
  IconCheck,
  IconDotsVertical,
  IconHash,
  IconPlus,
  IconSend,
  IconUsers,
} from "@tabler/icons-react";

/* ─── Mock chat panel ─── */
export function ChatPanel() {
  const messages = [
    {
      user: "janszi",
      avatar: "S",
      color: "bg-violet-500",
      text: "Frissítettem a wireframe-t a dashboard-hoz ✓",
      time: "2m",
    },
    {
      user: "andris",
      avatar: "J",
      color: "bg-sky-500",
      text: "Jól néz ki! Hadd pusholjam fel a frissítést.",
      time: "1m",
    },
    {
      user: "te",
      avatar: "Y",
      color: "bg-green-600",
      text: "Rajta vagyok - a PR 10 perc múlva elérhető lesz. 🚀",
      time: "most",
    },
  ];
  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/70 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/60">
        <IconHash size={14} className="text-zinc-500" />
        <span className="text-sm font-medium text-zinc-300">frontend</span>
        <span className="ml-auto text-xs text-green-500 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          {messages.length} elérhető
        </span>
      </div>
      <div className="p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div
              className={`w-6 h-6 rounded-full ${m.color} flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5`}
            >
              {m.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1.5 mb-0.5">
                <span className="text-xs font-semibold text-zinc-300">
                  {m.user}
                </span>
                <span className="text-[10px] text-zinc-600">
                  {m.time} előtt
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 rounded-lg bg-zinc-900/80 border border-zinc-800/60 px-3 py-2">
          <span className="text-xs text-zinc-600 flex-1">
            Üzenj a #frontend szobába
          </span>
          <IconSend size={13} className="text-green-600" />
        </div>
      </div>
    </div>
  );
}

/* ─── Mock project card ─── */
function ProjectCard({
  name,
  members,
  tasks,
  bugs,
  color,
}: {
  name: string;
  members: number;
  tasks: number;
  bugs: number;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/60 backdrop-blur-sm p-4 hover:border-green-800/50 transition-colors group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
          <span className="text-sm font-semibold text-zinc-100">{name}</span>
        </div>
        <IconDotsVertical
          size={14}
          className="text-zinc-600 group-hover:text-zinc-400 transition-colors"
        />
      </div>
      <div className="flex items-center gap-3 text-xs text-zinc-500">
        <span className="flex items-center gap-1">
          <IconUsers size={11} />
          {members} members
        </span>
        <span className="flex items-center gap-1">
          <IconCheck size={11} className="text-green-500" />
          {tasks} tasks
        </span>
        <span className="flex items-center gap-1">
          <IconBug size={11} className="text-red-400" />
          {bugs} bugs
        </span>
      </div>
      <div className="mt-3 h-1 rounded-full bg-zinc-800 overflow-hidden">
        <div
          className={`h-full rounded-full bg-linear-to-r from-green-600 to-green-400`}
          style={{ width: `${(tasks / 20) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default function FloatingUIPreview() {
  return (
    <div className="animate-slide-up delay-500 mt-16 w-full max-w-5xl mx-auto relative">
      {/* glow under preview */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-24 blur-3xl opacity-25 bg-green-500 rounded-full" />

      <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/60">
        {/* window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/60 bg-zinc-900/40">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-zinc-500 font-mono">
            planitapp.hu/projects/acme-corp
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* sidebar */}
          <div className="hidden md:block border-r border-zinc-800/60 p-4 space-y-1">
            <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-3 px-2">
              Projects
            </p>
            {[
              { name: "acme-corp", color: "bg-green-500", active: true },
              { name: "mobile-app", color: "bg-sky-500" },
              { name: "backend-api", color: "bg-purple-500" },
            ].map((p, i) => (
              <div
                key={i}
                className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-xs cursor-pointer transition-colors ${p.active ? "bg-green-950/50 text-green-300" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40"}`}
              >
                <span className={`w-2 h-2 rounded-full ${p.color}`} />
                {p.name}
              </div>
            ))}
            <div className="pt-3">
              <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-2 px-2">
                Channels
              </p>
              {["#general", "#frontend", "#bugs"].map((c) => (
                <div
                  key={c}
                  className="px-2 py-1.5 text-xs text-zinc-600 hover:text-zinc-400 cursor-pointer rounded-lg hover:bg-zinc-800/30 transition-colors flex items-center gap-1.5"
                >
                  <IconHash size={11} />
                  {c.slice(1)}
                </div>
              ))}
            </div>
          </div>

          {/* main area */}
          <div className="col-span-2 p-4 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <div>
                <h3 className="text-sm font-semibold text-zinc-100">
                  acme-corp
                </h3>
                <p className="text-[11px] text-zinc-500">
                  4 members · Sprint 3
                </p>
              </div>
              <button className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-green-500/10 text-green-400 border border-green-800/40 hover:bg-green-500/20 transition-colors">
                <IconPlus size={11} /> Add task
              </button>
            </div>
            <ProjectCard
              name="Auth & Onboarding"
              members={3}
              tasks={14}
              bugs={1}
              color="bg-green-500"
            />
            <ProjectCard
              name="Dashboard UI"
              members={2}
              tasks={9}
              bugs={2}
              color="bg-sky-500"
            />
            <ChatPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
