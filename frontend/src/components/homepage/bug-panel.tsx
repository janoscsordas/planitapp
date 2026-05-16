import { IconBug } from "@tabler/icons-react";

/* ─── Bug report mock ─── */
export default function BugPanel() {
  type BugStatus = "open" | "in progress" | "resolved";
  type BugSeverity = "high" | "critical" | "low";

  const bugs = [
    {
      id: "#041",
      title: "Modal z-index overlap on mobile",
      severity: "high" as BugSeverity,
      status: "open" as BugStatus,
    },
    {
      id: "#042",
      title: "Auth token not refreshing silently",
      severity: "critical" as BugSeverity,
      status: "in progress" as BugStatus,
    },
    {
      id: "#043",
      title: "Dark mode flicker on load",
      severity: "low" as BugSeverity,
      status: "resolved" as BugStatus,
    },
  ];
  const sev = {
    high: "text-orange-400 bg-orange-400/10",
    critical: "text-red-400 bg-red-400/10",
    low: "text-zinc-400 bg-zinc-400/10",
  };
  const stat = {
    open: "text-yellow-400",
    "in progress": "text-sky-400",
    resolved: "text-green-400",
  };
  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/70 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/60">
        <IconBug size={14} className="text-red-400" />
        <span className="text-sm font-medium text-zinc-300">Bug Tracker</span>
        <span className="ml-auto text-xs rounded-full px-2 py-0.5 bg-red-500/10 text-red-400">
          2 open
        </span>
      </div>
      <div className="divide-y divide-zinc-800/40">
        {bugs.map((b, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <span className="text-[10px] text-zinc-600 font-mono w-10">
              {b.id}
            </span>
            <span className="text-xs text-zinc-300 flex-1 truncate">
              {b.title}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${sev[b.severity]}`}
            >
              {b.severity}
            </span>
            <span className={`text-[10px] ${stat[b.status]}`}>{b.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
