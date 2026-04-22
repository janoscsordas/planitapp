import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import z from 'zod'
import { Card, CardContent } from '#/components/ui/card'
import { FieldDescription, FieldGroup, FieldSeparator } from '#/components/ui/field'
import { Field, FieldLabel, FieldError } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { IconBrandGithub } from "@tabler/icons-react"
import { Button } from '#/components/ui/button'
import { authClient } from '#/lib/auth-client'
import OAuthButton from '#/components/auth/oauth-button'
import { Spinner } from '#/components/ui/spinner'
import { toast } from 'sonner'

export const Route = createFileRoute('/(auth)/register')({
  component: RegisterPage,
})

const registerFormSchema = z.object({
  email: z.email("Hibás email cím."),
  password: z
    .string()
    .min(8, "A jelszónak legalább 8 karakternek kell lennie.")
    .max(24, "A jelszó maximum 24 karakter lehet.")
    .regex(/[0-9]/, "A jelszónak tartalmaznia kell legalább egy számot.")
    .regex(/[!@#$%^&*(),.?":{}|<>-]/, "A jelszónak tartalmaznia kell legalább egy speciális karaktert."),
  passwordConfirm: z.string()
}).refine((data) => data.password === data.passwordConfirm, {
  message: "A jelszavak nem egyeznek",
  path: ["passwordConfirm"],
})

function RegisterPage() {
  const navigate = Route.useNavigate()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validators: {
      onSubmit: registerFormSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email({
        name: value.email.split('@')[0],
        email: value.email,
        password: value.password,
        callbackURL: '/onboarding',
      }, {
        onError: (ctx) => {
          toast.error(ctx.error.message, {
            duration: 5000,
          })
          form.resetField('password')
          form.resetField('passwordConfirm')
        },
        onSuccess: () => {
          // We are now giving the email address to the verify-email page
          // We need the email to show the email on the page as well so the user knows
          // if they signed up with the correct email
          navigate({ to: '/verify-email?email=' + encodeURIComponent(form.state.values.email) + '&resent=false' })
        }
      })
    },
  })

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  form.handleSubmit()
                }}
                className="p-6 md:p-8"
                id="register-form"
              >
                <FieldGroup>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Fiók Regisztráció</h1>
                    <p className="text-sm text-balance text-muted-foreground">
                      Add meg az e-mail címed a fiók létrehozásához
                    </p>
                  </div>
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
                            placeholder="m@example.com"
                            autoComplete="off"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )
                    }}
                  />
                  <form.Field
                    name="password"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Jelszó</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            type="password"
                            placeholder="**********"
                            autoComplete="off"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )
                    }}
                  />
                  <form.Field
                    name="passwordConfirm"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Jelszó megerősítése</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            type='password'
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="**********"
                            aria-invalid={isInvalid}
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
                        <Button className="w-full cursor-pointer" type="submit" form="register-form" disabled={isSubmitting}>
                          {isSubmitting ? <Spinner /> : 'Regisztráció'}
                        </Button>
                      </Field>
                    )}
                  />
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    Vagy az alábbiakkal
                  </FieldSeparator>

                  <Field className="flex flex-col gap-4">
                    <OAuthButton provider={{ id: "github", name: "Folytatás GitHub fiókkal", icon: <IconBrandGithub /> }} />
                  </Field>
                  
                  <FieldDescription className="text-center">
                    Már van fiókod? <Link to="/login">Jelentkezz be!</Link>
                  </FieldDescription>
                </FieldGroup>
              </form>

              {/* Placeholder Image */}

              <div className="relative hidden bg-muted md:block">
                <img
                  src="/placeholder.svg"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            A folytatással elfogadom a <Link to="/">Felhasználói Feltételeket</Link> és az <Link to="/">Adatvédelmi Szabályzatot</Link>.
          </FieldDescription>
        </div>
      </div>
    </div>
  )
}
