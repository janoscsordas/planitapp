import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import z from 'zod'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/components/ui/card'
import { FieldGroup } from '#/components/ui/field'
import { Field, FieldLabel, FieldError } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { IconBrandGithub } from "@tabler/icons-react"
import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
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
      const { error } = await authClient.signUp.email({
        name: value.email.split('@')[0],
        email: value.email,
        password: value.password,
        callbackURL: '/onboarding',
      })

      if (error) {
        toast.error(error.message, {
          duration: 5000,
        })
        form.resetField('password')
        form.resetField('passwordConfirm')
      }
      
      if (!error) {
        navigate({ to: '/verify-email' })
      }
    },
  })

  return (
    <main className='w-full min-h-screen flex justify-center items-center'>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Fiók Regisztráció</CardTitle>
          <CardDescription>
            Regisztrálj fiókot az alkalmazás használatához
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            id="register-form"
          >
            <FieldGroup>
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
                        placeholder="Email"
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
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col gap-5'>
          <form.Subscribe 
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([, isSubmitting]) => (
              <Field orientation="horizontal">
                <Button className="w-full" type="submit" form="register-form" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner /> : 'Regisztráció'}
                </Button>
              </Field>
            )}
          />
          <div className="relative w-full">
            <Separator />
            <p className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-muted font-medium px-3 text-center text-xs text-muted-foreground">
              VAGY
            </p>
          </div>

          {/* GitHub OAuth button */}
          <OAuthButton provider={{ id: 'github', name: 'Folytatás GitHub fiókkal', icon: <IconBrandGithub /> }} />

          <Separator />
          <p className="text-center text-xs text-muted-foreground">
            Már van fiókod? <Link to="/login" className='underline'>Jelentkezz be</Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
