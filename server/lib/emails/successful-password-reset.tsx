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
    gap: "7px",
    backgroundColor: "#e6f8ef",
    borderRadius: "20px",
    padding: "6px 14px",
    marginBottom: "18px",
  },
  eyebrowText: {
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "#1d8a50",
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
  smallText: {
    fontSize: "14px",
    color: "#666666",
    lineHeight: "1.6",
    margin: "0",
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
}

const SuccessfulResetEmail = function SuccessfulResetEmail({
  name,
}: EmailProps) {
  return (
    <Tailwind>
      <Html lang="hu">
        <Head>
          <title>Planitapp - Sikeres jelszócsere</title>
        </Head>
        <Container style={styles.outer}>
          <Container style={styles.wrapper}>
            {/* Logo */}
            <Section style={{ marginBottom: "32px" }}>
              <img
                src="full-logo.png"
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
              <span style={styles.eyebrowText}>Sikeres jelszócsere</span>
            </Section>

            {/* Heading */}
            <Heading style={styles.heading}>
              Jelszavad sikeresen megváltozott!
            </Heading>

            {/* Body */}
            <Text style={styles.body}>
              Fiókod jelszava sikeresen frissítve lett. Ha te hajtottad végre
              ezt a változtatást, nincs további teendőd.
            </Text>

            {/* CTA */}
            <Button href="https://planitapp.hu/login" style={styles.button}>
              Bejelentkezés {/* icons */}
            </Button>

            {/* Warning box */}
            <Section style={{ ...styles.warningBox, marginTop: "28px" }}>
              <Text style={styles.warningText}>
                Ha nem te változtattad meg a jelszavad, azonnal vedd fel velünk
                a kapcsolatot:{" "}
                <Link
                  href="mailto:support@planitapp.hu"
                  style={{
                    color: "#c0392b",
                    fontWeight: "600",
                    textDecoration: "underline",
                  }}
                >
                  support@planitapp.hu
                </Link>
              </Text>
            </Section>

            {/* Support */}
            <Text
              style={{
                ...styles.smallText,
                marginTop: "28px",
                marginBottom: "28px",
              }}
            >
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

export default SuccessfulResetEmail
