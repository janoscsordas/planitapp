import { IconStar } from "@tabler/icons-react";

/* ─── Testimonial ─── */
export default function Testimonial({
  quote,
  name,
  role,
  company,
}: {
  quote: string;
  name: string;
  role: string;
  company: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800/50 bg-zinc-950/50 p-6 flex flex-col gap-4">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <IconStar
            key={i}
            size={13}
            className="text-green-500 fill-green-500"
          />
        ))}
      </div>
      <p className="text-sm text-zinc-400 leading-relaxed italic">"{quote}"</p>
      <div>
        <p className="text-sm font-semibold text-zinc-200">{name}</p>
        <p className="text-xs text-zinc-500">
          {role} · {company}
        </p>
      </div>
    </div>
  );
}