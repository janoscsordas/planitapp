import OAuthButton from "#/components/auth/oauth-button";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Spinner } from "#/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import { authClient } from "#/lib/auth-client";
import { IconBrandGithub } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";

export const Route = createFileRoute("/_guest/login")({
  component: LoginPage,
});

const loginSchema = z.object({
  email: z.email("Hibás email cím"),
  password: z.string().min(1, "Jelszó megadása kötelező"),
});

function LoginPage() {
  const navigate = Route.useNavigate();
  const lastLoginMethod = authClient.getLastUsedLoginMethod();
  const { redirect } = Route.useSearch();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
          callbackURL: "/projects",
        },
        {
          onError: async (ctx) => {
            // We are checking if the user needs to verify their email
            // If yes we send them another one and redirect them to the verify email page
            if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
              await authClient.sendVerificationEmail({
                email: value.email,
                callbackURL: "/onboarding",
              });

              // Redirect to verify email page
              navigate({
                to: "/verify-email",
                search: { email: value.email, resent: true, redirect },
              });
            }

            toast.error(ctx.error.message, {
              duration: 5000,
            });
            form.resetField("password");
          },
          onSuccess: () => {
            navigate({ to: redirect, search: { redirect } });
          },
        },
      );
    },
  });

  return (
    <div className="w-full max-w-sm md:max-w-4xl">
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="p-6 md:p-8"
              id="login-form"
            >
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Bejelentkezés</h1>
                  <p className="text-sm text-balance text-muted-foreground">
                    Jelentkezz be a PlanitApp fiókodba.
                  </p>
                </div>
                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
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
                        {field.state.meta.isTouched &&
                          !field.state.meta.isValid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="password"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <div className="flex items-center ">
                          <FieldLabel htmlFor={field.name}>Jelszó</FieldLabel>
                          <Link
                            to="/forgot-password"
                            className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
                          >
                            Elfelejtettem a jelszavam
                          </Link>
                        </div>
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
                        {field.state.meta.isTouched &&
                          !field.state.meta.isValid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                      </Field>
                    );
                  }}
                />
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([, isSubmitting]) => (
                    <Field orientation="horizontal">
                      <Button
                        className="w-full"
                        type="submit"
                        form="login-form"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? <Spinner /> : "Bejelentkezés"}
                      </Button>
                    </Field>
                  )}
                />
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  Vagy az alábbiakkal
                </FieldSeparator>

                <Field className="flex flex-col gap-4">
                  {lastLoginMethod === "github" ? (
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <OAuthButton
                            provider={{
                              id: "github",
                              name: "Folytatás GitHub fiókkal",
                              icon: <IconBrandGithub />,
                            }}
                          />
                        }
                      />
                      <TooltipContent>Legutóbb ezzel léptél be</TooltipContent>
                    </Tooltip>
                  ) : (
                    <OAuthButton
                      provider={{
                        id: "github",
                        name: "Folytatás GitHub fiókkal",
                        icon: <IconBrandGithub />,
                      }}
                    />
                  )}
                </Field>

                <FieldDescription className="text-center">
                  Még nincs fiókod? <Link to="/register">Regisztrálj!</Link>
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
      </div>
    </div>
  );
}
