import { Resend } from "resend"
import VerificationEmail from "./emails/email-successful"
import SuccessfulResetEmail from "./emails/successful-password-reset"
import ForgotPasswordEmail from "./emails/email-forgot-password"

const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function sendVerificationEmail({
  to,
  name,
  verificationLink,
}: {
  to: string
  name: string
  verificationLink: string
}) {
  const { error } = await resend.emails.send({
    from: "PlanitApp <onboarding@planitapp.hu>",
    to,
    subject: "PlanitApp - Sikeres regisztráció",
    react: VerificationEmail({
      name: name,
      verificationLink: verificationLink,
    }),
  })

  if (error) {
    console.error("Hiba az e-mail küldésekor:", error)
  }
}

export async function sendSuccessfulResetEmail({
  to,
  name,
}: {
  to: string
  name: string
}) {
  const { error } = await resend.emails.send({
    from: "PlanitApp <onboarding@planitapp.hu>",
    to,
    subject: "PlanitApp - Sikeres jelszócsere",
    react: SuccessfulResetEmail({
      name: name,
    }),
  })

  if (error) {
    console.error("Hiba az e-mail küldésekor:", error)
  }
}

export async function sendForgotPasswordEmail({
  to,
  name,
  resetLink,
}: {
  to: string
  name: string
  resetLink: string
}) {
  const { error } = await resend.emails.send({
    from: "PlanitApp <onboarding@planitapp.hu>",
    to,
    subject: "PlanitApp - Jelszó visszaállítása",
    react: ForgotPasswordEmail({
      name: name,
      resetLink: resetLink,
    }),
  })

  if (error) {
    console.error("Hiba az e-mail küldésekor:", error)
  }
}
