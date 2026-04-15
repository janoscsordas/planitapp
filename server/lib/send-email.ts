import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function sendVerificationEmail({ to, name, url }: { to: string; name: string; url: string }) {
    const { error } = await resend.emails.send({
        from: "PlanitApp <onboarding@planitapp.hu>",
        to,
        subject: "Regisztráció Megerősítése",
        html: `<p>Üdv, ${name}!</p><br/><p>Kattints az alábbi linkre az email megerősítéséhez:</p><br/><a href="${url}">Regisztráció befejezése</a>`
    })

    if (error) {
        console.error("Failed to send email:", error)
    }
}