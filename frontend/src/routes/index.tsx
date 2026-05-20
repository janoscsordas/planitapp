import { createFileRoute, Link } from "@tanstack/react-router";

import {
  IconActivity,
  IconBug,
  IconCheck,
  IconArrowRight,
  IconBolt,
  IconMessage2,
  IconLayoutKanban,
  IconChevronRight,
  IconSparkles,
  IconShield,
  IconBell,
  IconPlayerPlay,
} from "@tabler/icons-react";
import LiveFeed from "#/components/homepage/live-feed";
import Counter from "#/components/homepage/animated-counter";
import MeshBackground from "#/components/homepage/animated-mesh-background";
import Navbar from "#/components/homepage/navbar";
import FloatingUIPreview, {
  ChatPanel,
} from "#/components/homepage/floating-ui-preview";
import Testimonial from "#/components/homepage/testimonial";
import BugPanel from "#/components/homepage/bug-panel";
import FeatureCard from "#/components/homepage/feature-card";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  return (
    <div className="min-h-screen">
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
          Projektek, feladatok, élő chat, aktivitás ablakok, és bug tracking —
          mindez egy helyen. Hívd meg a csapatod és lássatok munkához most.
        </p>

        <div className="animate-slide-up delay-300 flex flex-col sm:flex-row items-center gap-3 mb-10">
          <Link to="/register" search={{ redirect: "/projects" }}>
            <button className="cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-zinc-950 font-semibold text-sm hover:bg-green-400 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20">
              Kezdj bele <IconArrowRight size={16} />
            </button>
          </Link>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700/60 text-zinc-300 text-sm hover:border-zinc-600 hover transition-all">
            <IconPlayerPlay size={14} className="text-green-400" /> Demo
            megtekintése
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
              <div
                className="text-3xl font-bold text-green-400 mb-1"
                style={{ fontFamily: "DM Mono, monospace" }}
              >
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-6" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-green-500 mb-3 block">
              Minden, amire szükséged van
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Olyan csapatoknak készült, akik gyorsan haladnak
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Minden elérhető funkció, úgy készült, hogy a csapat tagjai
              könnyedén tudjanak dolgozni.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              icon={IconLayoutKanban}
              title="Projektek"
              desc="Izolált projektek létrehozása, tagok meghívása különböző szerepkörökkel és a feladatok menedzselése."
            />
            <FeatureCard
              icon={IconActivity}
              title="Élő Aktivitás Panel"
              desc="Valós-Idejű történések a projektek bármely pontjáról, legyen ez feladat készítés, módosítás, elvégzés stb."
              accent="from-sky-900/20 to-transparent"
            />
            <FeatureCard
              icon={IconMessage2}
              title="Beépített Chat Szobák"
              desc="Szoba alapú üzenetküldés projekten belül. Nincs szükség külsős app-okra, mint a Slack."
              accent="from-violet-900/20 to-transparent"
            />
            <FeatureCard
              icon={IconBug}
              title="Probléma Jelentés"
              desc="Probléma kezelés fontosság szerint. Kapjanak figyelmet a először a kritikusabb problémák a projektedben."
              accent="from-red-900/20 to-transparent"
            />
            <FeatureCard
              icon={IconBell}
              title="Smart Notifications"
              desc="Get notified about what matters. Intelligent filtering surfaces the signal, not the noise."
              accent="from-yellow-900/20 to-transparent"
            />
            <FeatureCard
              icon={IconShield}
              title="Engedélyek & Szerepek"
              desc="Tulajdonos, adming és tag szerepekkel beállíthatod, hogy ki és mit tud csinálni a projektedben."
              accent="from-teal-900/20 to-transparent"
            />
          </div>
        </div>
      </section>

      {/* ── DEEP DIVE: BUG + ACTIVITY ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-green-500 mb-3 block">
              Probléma Kezelés
            </span>
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              A jelentéstől a javításig, rekord idő alatt
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Hibák rögzítése közvetlenül a projektedből. Rendelj hozzá
              súlyossági szintet, kapcsold feladatokhoz és kövesd a megoldást —
              mindezt anélkül, hogy elhagynád a Planitappot.
            </p>
            <ul className="space-y-3">
              {[
                "Súlyossági szintek: alacsony, közepes, magas, kritikus",
                "Hibák azonnali hozzárendelése csapattagokhoz",
                "Hibák összekapcsolása feladatokkal",
              ].map((t, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground"
                >
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
          <div
            className="order-2 md:order-1 animate-float"
            style={{ animationDelay: "1s" }}
          >
            <ChatPanel />
          </div>
          <div className="order-1 md:order-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-green-500 mb-3 block">
              Csapat Chat
            </span>
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              A kontextus ott él, ahol a munka zajlik.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Készíts csatornákat a különböző tematikájú feladatok elvégzéséhez.
              Említsd meg a tagokat, ossz meg fájlokat - megszakítás nélkül.
              Lapváltás nélkül.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sm text-green-400 hover:text-green-300 transition-colors font-medium"
            >
              Tekintsd meg az elérhető kommunikációs funkciókat{" "}
              <IconChevronRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              A csapatok imádják a{" "}
              <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-green-300 via-green-400 to-green-500">
                Planit
              </span>
              appot
            </h2>
            <p className="text-muted-foreground text-sm">
              Gyorsan haladó fejlesztői csapatok eszköze.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Testimonial
              quote="Lecseréltük a Jira-t, Linear-t és Slack-et a Planitapp-ra. Az elkészülési időnk lecsökkent 30 percről, 10-re."
              name="Koós Balázs Bence"
              role="Vezető fejlesztő"
              company="Lersohann Labs Co."
            />
            <Testimonial
              quote="Az élő aktivitás jelző egy igazi game-changer. Látom, hogy ki mit csinál, nem kell külön megkérdeznem mindenkit."
              name="Csordás János"
              role="CEO of Lersohann Labs Co."
              company="Lersohann Labs Co."
            />
            <Testimonial
              quote="Nagyon szépen összerakott alkalmazás. Külön tetszik, hogy chat szobákat lehet létrehozni, adott témával kapcsolatban egy projekten belül."
              name="Vásári András"
              role="Vezető UI Designer"
              company="Lersohann Labs Co."
            />
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 px-6" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">
              Egyszerű, átlátható árazás
            </h2>
            <p className="text-muted-foreground text-sm">
              Kezdj ingyen. Amikor készen állsz, ugorj a következő szintre.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                name: "Kezdő",
                price: "Ingyenes",
                sub: "Örökre, akár 20 taggal/projekt",
                features: [
                  "3 projekt",
                  "20 tag/projekt",
                  "7-napos aktivitási előzmény",
                  "3 chat szoba/projekt",
                  "Emailes támogatás",
                  "Alap probléma követés",
                ],
                cta: "Kezdés",
                highlight: false,
              },
              {
                name: "Professzionális",
                price: "3490 HUF",
                sub: "havonta",
                features: [
                  "20 projekt",
                  "100 tag/projekt",
                  "30-napos aktivitási előzmény",
                  "10 chat szoba/projekt",
                  "Egyéni szerepkörök és jogosultságok",
                  "GitHub integráció",
                ],
                cta: "Vásárlás",
                highlight: true,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl border p-6 flex flex-col ${plan.highlight ? "border-primary/60 bg-primary/10 shadow-xl shadow-primary/20" : "border-border/90 bg-background/30"}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground">
                      Legnépszerűbb
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-zinc-400 mb-1">
                    {plan.name}
                  </p>
                  <p className="text-3xl font-bold">
                    {plan.price}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{plan.sub}</p>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <IconCheck
                        size={13}
                        className="text-primary shrink-0"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register">
                  <button
                    className={`cursor-pointer w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95 ${plan.highlight ? "bg-primary text-primary-foreground hover:bg-primary/80" : "border border-muted text-foreground hover:border-muted-foreground hover"}`}
                  >
                    {plan.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center relative">
          <div
            className="absolute inset-0 blur-3xl opacity-15 rounded-full"
            style={{
              background: "radial-gradient(ellipse, #22c55e, transparent 70%)",
            }}
          />
          <div className="relative">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              A csapatod megérdemel egy jobb
              <br />
              módot a közös munkára.
            </h2>
            <p className="text-zinc-400 text-base mb-8 max-w-md mx-auto">
              Készítsd el az első projekted 2 perc alatt.
            </p>
            <Link to="/projects">
              <button className="cursor-pointer inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-green-500 text-zinc-950 font-bold text-base hover:bg-green-400 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-green-500/30">
                Projekt létrehozása <IconArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-800/40 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                <IconBolt size={12} className="text-zinc-950 stroke-[2.5]" />
              </div>
              <span className="font-bold text-foreground tracking-tight text-sm">
                planit<span className="text-primary">app</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              {[
                "Adatvédelmi nyilatkozat",
                "Felhasználási feltételek",
                "Státusz",
                "Frissítési Napló",
                "Blog",
              ].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="hover:muted-foreground transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} planitapp. Minden jog fenntartva.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
