import { createFileRoute } from "@tanstack/react-router"
import { Header } from "@/components/homepage/header"
import { Hero } from "@/components/homepage/hero"
import { Features } from "@/components/homepage/features"
import { SignupForm } from "@/components/homepage/sign-up-form"
import { Footer } from "@/components/homepage/footer"

export const Route = createFileRoute("/")({ component: App })

export default function App() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Header />
      <Features />
      <SignupForm />
      <Footer />
    </main>
  )
}
