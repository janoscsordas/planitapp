"use client"

import { Button } from "@/components/ui/button"
import { IconSparkles, IconArrowRight } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"

const COLUMNS = [
  {
    id: "todo",
    label: "Teendő",
    dotColor: "bg-zinc-600",
    tasks: [
      {
        id: 1,
        title: "Bejelentkezési oldal redesign",
        tag: { label: "Design", color: "tag-blue" },
        avatar: { initials: "JK", bg: "bg-blue-900", text: "text-blue-300" },
        progress: null,
      },
      {
        id: 2,
        title: "API dokumentáció frissítése",
        tag: { label: "Backend", color: "tag-amber" },
        avatar: { initials: "PF", bg: "bg-amber-900", text: "text-amber-300" },
        progress: null,
      },
      {
        id: 3,
        title: "Mobilnézet tesztelése",
        tag: { label: "QA", color: "tag-purple" },
        avatar: {
          initials: "SZ",
          bg: "bg-purple-900",
          text: "text-purple-300",
        },
        progress: null,
      },
    ],
  },
  {
    id: "inprogress",
    label: "Folyamatban",
    dotColor: "bg-blue-500",
    tasks: [
      {
        id: 4,
        title: "Adatbázis migráció",
        tag: { label: "Backend", color: "tag-amber" },
        avatar: { initials: "BM", bg: "bg-teal-900", text: "text-teal-300" },
        progress: 68,
        progressColor: "bg-amber-400",
      },
      {
        id: 5,
        title: "Dashboard komponensek",
        tag: { label: "Frontend", color: "tag-blue" },
        avatar: { initials: "JK", bg: "bg-blue-900", text: "text-blue-300" },
        progress: 45,
        progressColor: "bg-blue-400",
      },
    ],
  },
  {
    id: "done",
    label: "Kész",
    dotColor: "bg-teal-500",
    tasks: [
      {
        id: 6,
        title: "Hitelesítés implementálása",
        tag: { label: "Auth", color: "tag-teal" },
        avatar: { initials: "BM", bg: "bg-teal-900", text: "text-teal-300" },
        progress: 100,
        progressColor: "bg-teal-400",
      },
      {
        id: 7,
        title: "CI/CD pipeline felállítása",
        tag: { label: "DevOps", color: "tag-amber" },
        avatar: { initials: "PF", bg: "bg-amber-900", text: "text-amber-300" },
        progress: 100,
        progressColor: "bg-teal-400",
      },
    ],
  },
]

const TAG_STYLES: Record<string, string> = {
  "tag-blue": "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/20",
  "tag-amber": "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/20",
  "tag-purple": "bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/20",
  "tag-teal": "bg-teal-500/15 text-teal-400 ring-1 ring-teal-500/20",
}

function TaskCard({
  task,
  animate,
}: {
  task: (typeof COLUMNS)[0]["tasks"][0]
  animate: boolean
}) {
  const progress = "progress" in task ? (task.progress as number | null) : null
  const progressColor =
    "progressColor" in task ? (task.progressColor as string) : ""

  return (
    <div className="group bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] hover:border-white/[0.12] rounded-xl p-3 transition-all duration-200 hover:-translate-y-px cursor-pointer">
      <p className="text-[12.5px] text-zinc-300 leading-snug font-normal">
        {task.title}
      </p>
      <div className="flex items-center justify-between mt-2.5">
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
            TAG_STYLES[task.tag.color]
          }`}
        >
          {task.tag.label}
        </span>
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-semibold ${task.avatar.bg} ${task.avatar.text}`}
        >
          {task.avatar.initials}
        </div>
      </div>
      {progress !== null && (
        <div className="mt-2.5">
          <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ease-out ${progressColor}`}
              style={{
                width: animate ? `${progress}%` : "0%",
                transitionDuration: animate ? "1100ms" : "0ms",
                transitionDelay: animate ? "300ms" : "0ms",
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export function Hero() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
      {/* Background gradient effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-125 w-125 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-100 w-100 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size:64px_64px" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5">
            <IconSparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              AI-alapú projektkezelés
            </span>
          </div>

          {/* Main headline */}
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Kövesd nyomon a <span className="text-primary">terveid</span>
            <br />a Planitapp-pal
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            Projekt- és feladatkezelő alkalmazás, amely segít a csapatoknak a
            munkafolyamatok nyomon követésében és rendszerezésében. Könnyed
            csapatmunka, hatékony feladatkezelés.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group h-12 gap-2 bg-primary px-8 text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/register" className="flex items-center gap-2">
                Kezd el ingyen
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 border-border px-8 text-foreground hover:bg-secondary"
            >
              <a href="#funkciok">Tudj meg többet</a>
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-secondary text-xs font-medium text-muted-foreground"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">500+</span> csapat
              már használja
            </p>
          </div>
        </div>

        {/* Dashboard preview mockup */}
        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="bg-[#0d1117] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
            {/* Title bar */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
              {/* Traffic lights */}
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-900/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-900/80" />
                <div className="w-3 h-3 rounded-full bg-green-900/80" />
              </div>
              {/* URL bar */}
              <div className="flex-1 bg-white/[0.05] rounded-md py-1 px-3 text-[11px] text-zinc-600 text-center tracking-wide select-none">
                app.planitapp.hu/projektek
              </div>
              {/* Spacer to balance traffic lights */}
              <div className="w-14" />
            </div>

            {/* Inner app shell */}
            <div className="bg-[#090d15] p-4">
              {/* App topbar */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[13px] font-semibold text-zinc-200 tracking-tight">
                    Q2 Sprint — Backend & Design
                  </p>
                  <p className="text-[11px] text-zinc-600 mt-0.5">
                    7 feladat · 3 csapattag
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Avatar stack */}
                  <div className="flex -space-x-1.5">
                    {[
                      {
                        initials: "JK",
                        bg: "bg-blue-900",
                        text: "text-blue-300",
                      },
                      {
                        initials: "BM",
                        bg: "bg-teal-900",
                        text: "text-teal-300",
                      },
                      {
                        initials: "SZ",
                        bg: "bg-purple-900",
                        text: "text-purple-300",
                      },
                      {
                        initials: "PF",
                        bg: "bg-amber-900",
                        text: "text-amber-300",
                      },
                    ].map((av) => (
                      <div
                        key={av.initials}
                        className={`w-6 h-6 rounded-full border-2 border-[#090d15] flex items-center justify-center text-[8px] font-semibold ${av.bg} ${av.text}`}
                      >
                        {av.initials}
                      </div>
                    ))}
                  </div>
                  <button className="text-[11px] text-zinc-500 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] px-3 py-1 rounded-lg transition-colors">
                    + Feladat
                  </button>
                </div>
              </div>

              {/* Kanban columns */}
              <div className="grid grid-cols-3 gap-3">
                {COLUMNS.map((col) => (
                  <div key={col.id} className="flex flex-col gap-2">
                    {/* Column header */}
                    <div className="flex items-center gap-2 px-1 mb-1">
                      <span
                        className={`w-2 h-2 rounded-full ${col.dotColor} shrink-0`}
                      />
                      <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest">
                        {col.label}
                      </span>
                      <span className="ml-auto text-[10px] text-zinc-700 bg-white/[0.04] rounded-full px-1.5 py-px">
                        {col.tasks.length}
                      </span>
                    </div>

                    {/* Column background */}
                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-2 flex flex-col gap-2 min-h-[160px]">
                      {col.tasks.map((task) => (
                        <TaskCard key={task.id} task={task} animate={animate} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="pointer-events-none absolute -inset-4 rounded-2xl bg-primary/5 blur-2xl" />
        </div>
      </div>
    </section>
  )
}
