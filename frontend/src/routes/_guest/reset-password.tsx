import { Button } from "#/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Spinner } from "#/components/ui/spinner";
import { authClient } from "#/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";

export const Route = createFileRoute("/_guest/reset-password")({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      token: (search.token as string) || "",
    };
  },
  beforeLoad: ({ search }) => {
    if (!search.token) {
      throw redirect({
        to: "/forgot-password",
      });
    }
  },
});

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "A jelszónak legalább 8 karakternek kell lennie.")
      .max(24, "A jelszó maximum 24 karakter lehet.")
      .regex(/[0-9]/, "A jelszónak tartalmaznia kell legalább egy számot.")
      .regex(
        /[!@#$%^&*(),.?":{}|<>-]/,
        "A jelszónak tartalmaznia kell legalább egy speciális karaktert.",
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "A jelszavak nem egyeznek",
    path: ["passwordConfirm"],
  });

function RouteComponent() {
  const { token } = Route.useSearch();
  const navigate = Route.useNavigate();

  const form = useForm({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.resetPassword(
        {
          token,
          newPassword: value.password,
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: async () => {
            toast.success("Jelszó sikeresen megváltoztatva");

            navigate({ to: "/login" });
          },
        },
      );
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-80 bg-background-alt">
        <h1 className="text-2xl text-center font-semibold tracking-tight">
          Jelszó visszaállítása
        </h1>
        <p className="text-center text-muted-foreground text-sm mb-8 mt-2">
          Itt tudod megváltoztatni a jelszavad
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          id="reset-password-form"
        >
          <FieldGroup>
            <form.Field
              name="password"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Új jelszó</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={
                      field.state.meta.isTouched && !field.state.meta.isValid
                    }
                    type="password"
                    placeholder="**********"
                    autoComplete="off"
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />
            <form.Field
              name="passwordConfirm"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Új jelszó megerősítése
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={
                      field.state.meta.isTouched && !field.state.meta.isValid
                    }
                    type="password"
                    placeholder="**********"
                    autoComplete="off"
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([, isSubmitting]) => (
                <Field orientation="horizontal">
                  <Button
                    className="w-full cursor-pointer"
                    type="submit"
                    form="reset-password-form"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Spinner /> : "Jelszó visszaállítása"}
                  </Button>
                </Field>
              )}
            />
          </FieldGroup>
          <p className="text-center text-muted-foreground text-xs mt-4">
            *A jelszó megváltoztatása után mindenhonnan kijelentkeztetünk.
          </p>
        </form>
      </div>
    </div>
  );
}
