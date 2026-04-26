"use client"

import {
  IconAlertTriangle,
  IconArrowRight,
  IconBolt,
  IconLockSquare,
  IconMessageShare,
} from "@tabler/icons-react"

const features = [
  {
    icon: IconMessageShare,
    title: "Team Chat",
    description:
      "A team chat funkcióval a projekt tagjai könnyedén tudnak ötleteket megosztani és kommunikálni egymással.",
  },
  {
    icon: IconLockSquare,
    title: "Task Management",
    description:
      "A task management funkcióval a projekt tagok kezelhetik a feladatokat és nyomon követhetik a folyamatokat.",
  },
  {
    icon: IconAlertTriangle,
    title: "Problémák Kezelése",
    description:
      "A problémák kezelése funkcióval a tagok létre tudnak hozni problémákat, vagy hozzá tudnak szólni meglévőhöz.",
  },
  {
    icon: IconBolt,
    title: "AI Asszisztens",
    description:
      "Planie AI asszisztensünk segít a projektek és feladatok hatékonyabb kezelésében, közben segíti a csapatmunkát.",
  },
]

export function Features() {
  return (
    <section id="funkciok" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Amit kínálunk
          </h2>
          <p className="text-lg text-muted-foreground">
            Minden eszköz egy helyen a sikeres projektekhez
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:bg-card/80"
            >
              {/* Hover glow effect */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>

                <p className="mb-4 text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Tudj meg többet
                  <IconArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
