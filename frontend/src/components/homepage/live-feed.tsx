import {
  IconFlag,
  IconGitBranch,
  IconBug,
  IconCheck,
  IconMessage2,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

/* ─── Floating live feed pill ─── */
const feedItems = [
  { icon: IconBug, color: "text-red-400", text: "Bug #47 megoldva @alex által" },
  {
    icon: IconCheck,
    color: "text-green-400",
    text: "Feladat 'Auth flow' kész",
  },
  {
    icon: IconMessage2,
    color: "text-sky-400",
    text: "Új üzenet a #frontend szobában",
  },
  {
    icon: IconGitBranch,
    color: "text-purple-400",
    text: "PR merged: feature/onboarding",
  },
  {
    icon: IconFlag,
    color: "text-yellow-400",
    text: "Mérföldkő 'v1.0 Beta' elérve",
  },
];

export default function LiveFeed() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % feedItems.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const item = feedItems[idx];
  const Icon = item.icon;
  
  return (
    <div
      className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-green-500/20 bg-green-950/30 backdrop-blur-md text-sm transition-all duration-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <Icon size={14} className={item.color} />
      <span className="text-zinc-300">{item.text}</span>
    </div>
  );
}
