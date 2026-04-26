"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconArrowRight, IconCircle2, IconSparkles } from "@tabler/icons-react"

export function SignupForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 3000)
      setEmail("")
    }
  }

  return (
    <section
      id="kapcsolat"
      className="relative overflow-hidden border-t border-border py-24 sm:py-32"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5">
            <IconSparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Ingyenes kezdés
            </span>
          </div>

          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Készen állsz?
          </h2>

          <p className="mb-8 text-lg text-muted-foreground">
            Csatlakozz több száz csapathoz, akik már a Planitapp-ot használják
            projektjeik kezelésére.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Input
                type="email"
                placeholder="Add meg az email címed"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="group h-12 gap-2 bg-primary px-6 text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitted ? (
                <>
                  <IconCircle2 className="h-4 w-4" />
                  Köszönjük!
                </>
              ) : (
                <>
                  Regisztráció
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            Ingyenes verzió - nincs bankkártya szükséges
          </p>

          {/* Feature highlights */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <IconCircle2 className="h-4 w-4 text-primary" />
              <span>Akár 20 csapattag</span>
            </div>
            <div className="flex items-center gap-2">
              <IconCircle2 className="h-4 w-4 text-primary" />
              <span>5 projekt</span>
            </div>
            <div className="flex items-center gap-2">
              <IconCircle2 className="h-4 w-4 text-primary" />
              <span>Analitikák</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
