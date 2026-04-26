import {
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

import { IconCircleCheck } from "@tabler/icons-react"

const styles = {
  outer: {
    // backgroundColor: "#f0ece4",
    padding: "32px 16px",
  },
  wrapper: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    maxWidth: "580px",
    margin: "0 auto",
    padding: "44px 44px 40px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  },
  warningBox: {
    backgroundColor: "#fff0f0",
    borderRadius: "8px",
    padding: "14px 18px",
    margin: "0 0 28px",
  },
  warningText: {
    fontSize: "13px",
    color: "#c0392b",
    lineHeight: "1.6",
    margin: "0",
  },
  logoText: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#45CB85",
    letterSpacing: "-0.01em",
    verticalAlign: "middle",
  },
  eyebrowPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#eafaf1",
    borderRadius: "30px",
    padding: "8px 18px",
    marginBottom: "18px",
    verticalAlign: "middle",
  },
  eyebrowText: {
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
    color: "#1d8a50",
    lineHeight: "1",
    marginTop: "1px",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#111111",
    lineHeight: "1.2",
    letterSpacing: "-0.02em",
    margin: "0 0 16px",
  },
  body: {
    fontSize: "15px",
    color: "#555555",
    lineHeight: "1.7",
    margin: "0 0 28px",
  },
  button: {
    backgroundColor: "#45CB85",
    borderRadius: "10px",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "700",
    padding: "14px 28px",
    textDecoration: "none",
    display: "inline-block",
  },
  fallbackBox: {
    backgroundColor: "#f7f7f5",
    borderRadius: "8px",
    padding: "16px 20px",
    margin: "0 0 24px",
  },
  fallbackLabel: {
    fontSize: "12px",
    color: "#999999",
    margin: "0 0 6px",
  },
  fallbackLink: {
    fontSize: "12px",
    color: "#45CB85",
    margin: "0",
    wordBreak: "break-all" as const,
  },
  smallText: {
    fontSize: "14px",
    color: "#666666",
    lineHeight: "1.6",
    margin: "0 0 6px",
  },
  footer: {
    borderTop: "1px solid #eeeeee",
    marginTop: "36px",
    paddingTop: "22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLeft: {
    fontSize: "13px",
    color: "#aaaaaa",
    margin: "0",
  },
  footerRight: {
    fontSize: "12px",
    color: "#bbbbbb",
    fontStyle: "italic" as const,
    margin: "0",
  },
}

type EmailProps = {
  name: string | null
  verificationLink: string
}

const VerificationEmail = function VerificationEmail({
  name,
  verificationLink,
}: EmailProps) {
  return (
    <Tailwind>
      <Html lang="hu">
        <Head>
          <title>Planitapp - Sikeres regisztráció</title>
        </Head>
        <Container style={styles.outer}>
          <Container style={styles.wrapper}>
            {/* Logo */}
            <Section style={{ marginBottom: "32px" }}>
              <img
                src=""
                width="34"
                height="34"
                alt="planitapp"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: "10px",
                }}
              />
            </Section>

            {/* Eyebrow pill */}
            <Section style={styles.eyebrowPill}>
              {/* <IconCircleCheck size={17} color="#1d8a50" /> */}
              <span style={styles.eyebrowText}>Sikeres regisztráció</span>
            </Section>

            {/* Heading */}
            <Heading style={styles.heading}>
              Üdvözöljük,
              <br />
              {name}!
            </Heading>

            {/* Body */}
            <Text style={styles.body}>
              Köszönjük, hogy regisztáltál a planitapp.hu-n! Kérjük, erősítsd
              meg az e-mail címedet az alábbi gombra kattintva, hogy teljes
              hozzáférést kapj a fiókodhoz.
            </Text>

            {/* CTA */}
            <Button
              href={verificationLink}
              style={{ ...styles.button, marginBottom: "28px" }}
            >
              E-mail cím hitelesítése {/* icon */}
            </Button>

            {/* Fallback */}
            <Section style={styles.fallbackBox}>
              <Text style={styles.fallbackLabel}>
                Ha a gomb nem működik, használd ezt a linket:
              </Text>
              <Text style={styles.fallbackLink}>
                <Link
                  href={verificationLink}
                  style={{ color: "#45CB85", textDecoration: "none" }}
                >
                  {verificationLink}
                </Link>
              </Text>
            </Section>

            <Section style={{ ...styles.warningBox, marginTop: "28px" }}>
              <Text style={styles.warningText}>
                Ha nem te regisztráltál, hagyjd figyelmen kívül ezt az e-mailt.
              </Text>
            </Section>

            {/* Support + ignore */}
            <Text style={styles.smallText}>
              Kérdésed van? Írj nekünk:{" "}
              <Link
                href="mailto:support@planitapp.hu"
                style={{
                  color: "#45CB85",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                support@planitapp.hu
              </Link>
            </Text>

            {/* Footer */}
            <Section style={styles.footer}>
              <Text style={styles.footerLeft}>
                Üdvözlettel, a Planitapp csapata!
              </Text>
              <Text style={styles.footerRight}>Automatikus levél</Text>
            </Section>
          </Container>
        </Container>
      </Html>
    </Tailwind>
  )
}

export default VerificationEmail
