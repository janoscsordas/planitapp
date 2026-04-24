import { Button } from '#/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { authClient } from '#/lib/auth-client'
import { IconCircleCheck, IconMail, IconRefresh } from '@tabler/icons-react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/(auth)/verify-email')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      email: search.email as string || "",
      resent: search.resent as boolean || false,
    }
  },
  beforeLoad: ({ context, search }) => {
    if (context.auth || !search.email) {
      throw redirect({
        to: '/',
      })
    }
  }
})

const TIMER_DURATION_MS = 10 * 60 * 1000 // 10 perc
const STORAGE_KEY = 'verify-email-expiry'

function RouteComponent() {
  const { email, resent } = Route.useSearch()
  
  // States for the timer and resend functionality
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [isResending, setIsResending] = useState(false)
  const [resendCount, setResendCount] = useState(0)

  // Initializing the timer
  useEffect(() => {
    const updateTimer = () => {
      const expiry = localStorage.getItem(STORAGE_KEY)
      if (!expiry || expiry === String(Date.now() + TIMER_DURATION_MS)) {
        const newExpiry = Date.now() + TIMER_DURATION_MS
        localStorage.setItem(STORAGE_KEY, newExpiry.toString())
        setTimeLeft(TIMER_DURATION_MS / 1000)
        return
      }

      const remaining = Math.max(0, Math.ceil((Number(expiry) - Date.now()) / 1000))
      setTimeLeft(remaining)
    }

    // When loading in the component we start the timer immediately
    updateTimer()

    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [])

  // We calculate the progress of the timer
  const canResend = timeLeft === 0
  const progress = ((TIMER_DURATION_MS - (timeLeft * 1000)) / TIMER_DURATION_MS) * 100

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }
  
  // We are handling the email resending logic here
  const handleResend = useCallback(async () => {
    if (!email) {
      toast.error("Hiányzik az email cím!")
      return
    }

    if (!canResend) {
      toast.error("Kérlek várd ki, amíg lejár az időzítő!")
      return
    }

    setIsResending(true)
    
    await authClient.sendVerificationEmail({
      email,
      callbackURL: '/onboarding',
    }, {
      onError: (ctx) => {
        toast.error(ctx.error.message)
        setIsResending(false)
      },
      onSuccess: () => {
        // If successful, update the expiry time
        const newExpiry = Date.now() + TIMER_DURATION_MS
        localStorage.setItem(STORAGE_KEY, newExpiry.toString())
        
        setTimeLeft(TIMER_DURATION_MS / 1000)
        setResendCount((prev) => prev + 1)
        setIsResending(false)
        toast.success("Email elküldve!")
      }
    })
  }, [email])

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border/50 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <IconMail className="w-8 h-8 text-primary animate-bounce-slow" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Nézd meg az e-mailjeid!
            </CardTitle>
            <CardDescription className="text-muted-foreground text-balance">
              {resent ? (
                // This will show up if the user came up from login and their email is not verified
                <div className="space-y-2">
                  <p>
                    Úgy tűnik, korábban már regisztráltál a(z) <span className="font-medium text-foreground">{email}</span> címmel, de még nem aktiváltad a fiókodat.
                  </p>
                  <p className="text-primary font-medium bg-primary/5 py-1 px-2 rounded-md border border-primary/10 inline-block">
                    Küldtünk neked egy friss megerősítő linket!
                  </p>
                </div>
              ) : (
                // This is the default message for new registrations
                <>
                  Küldtünk egy megerősítő linket a(z) <span className="font-medium text-foreground">{email}</span> címre. Kattints rá a fiókod aktiválásához.
                </>
              )}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Timer section */}
          <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center justify-between text-sm font-medium">
              <span className="text-muted-foreground">Link lejárati ideje</span>
              <span className={`font-mono ${timeLeft <= 60 ? "text-destructive animate-pulse" : "text-primary"}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-1000 ease-linear"
                style={{ width: `${100 - progress}%` }}
              />
            </div>
          </div>

          {/* Resend button */}
          <div className="space-y-3">
            <Button 
              onClick={handleResend}
              disabled={!canResend || isResending}
              variant={canResend ? "default" : "outline"}
              className="w-full h-11 transition-all cursor-pointer"
            >
              {isResending ? (
                <>
                  <IconRefresh className="w-4 h-4 mr-2 animate-spin" />
                  Küldés folyamatban...
                </>
              ) : (
                <>
                  <IconRefresh className={`w-4 h-4 mr-2 ${!canResend && 'opacity-50'}`} />
                  Email újraküldése
                </>
              )}
            </Button>
            
            {!canResend && !isResending && (
              <p className="text-[11px] text-center text-muted-foreground italic">
                A gomb újra aktív lesz, amint a számláló eléri a nullát.
              </p>
            )}
          </div>

          {/* Success feedback */}
          {resendCount > 0 && (
            <div className="flex items-center justify-center gap-2 text-sm text-emerald-600 bg-emerald-500/10 py-2 rounded-md border border-emerald-500/20">
              <IconCircleCheck className="w-4 h-4" />
              <span>Az email sikeresen újra lett küldve!</span>
            </div>
          )}

          {/* Help for user */}
          <div className="pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Nem találod? Nézd meg a <span className="font-medium text-foreground">Spam</span> mappát is, 
              vagy ellenőrizd, hogy helyesen írtad-e az email címet.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
