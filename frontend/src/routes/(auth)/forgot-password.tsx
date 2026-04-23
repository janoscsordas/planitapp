import { Button } from '#/components/ui/button'
import { Field, FieldError, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Spinner } from '#/components/ui/spinner'
import { authClient } from '#/lib/auth-client'
import { IconArrowLeft, IconMail } from '@tabler/icons-react'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import z from 'zod'

export const Route = createFileRoute('/(auth)/forgot-password')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.auth) {
      throw redirect({
        to: '/',
      })
    }
  },
})

const forgotPasswordSchema = z.object({
  email: z.email(),
})

function RouteComponent() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {

      // TODO: Implement functionality, so the user can reset their password.

      const {  } = await authClient.requestPasswordReset({
        email: value.email,
        redirectTo: "/reset-password"
      })
    },
  })

  return (
    <main className="min-h-svh flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <IconArrowLeft className="size-4" />
          Vissza a Kezdőlapra
        </Link>

        {!isSubmitted ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Elfelejtetted a jelszavad?
              </h1>
              <p className="text-muted-foreground text-sm">
                Nem gond, küldünk az email címedre egy linket a jelszavad visszaállításához.
              </p>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
              className="space-y-4"
            >
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email cím</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        type="email"
                        placeholder="m@példa.hu"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Subscribe 
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([, isSubmitting]) => (
                  <Field orientation="horizontal">
                    <Button 
                      className="w-full cursor-pointer" 
                      type="submit" 
                      form="login-form" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Spinner /> : 'Jelszó visszaállítása'}
                    </Button>
                  </Field>
                )}
              />
              
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Mégis emlékszel a jelszavadra?{" "}
              <Link
                to="/login"
                className="text-foreground hover:underline underline-offset-4 font-medium"
              >
                Jelentkezz be
              </Link>
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <IconMail className="size-6 text-primary" />
            </div>

            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Nézd meg az email fiókodat
              </h1>
              <p className="text-muted-foreground text-sm">
                Küldtünk egy linket erre az email címre:{" "}
                <span className="font-medium text-foreground">{submittedEmail}</span>
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsSubmitted(false)}
            >
              Vissza a jelszó visszaállításhoz
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Nem kaptad meg az email-t?{" "}
              <Button
                variant="link"
                onClick={() => {
                  setIsSubmitted(false)
                }}
                className="text-foreground hover:underline underline-offset-4 font-medium"
              >
                Email Újraküldése
              </Button>
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
