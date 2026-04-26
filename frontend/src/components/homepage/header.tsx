"use client"

import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { IconLayoutGrid } from "@tabler/icons-react"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <IconLayoutGrid className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">
            Planitapp
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#funkciok"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Funkciók
          </a>
          <a
            href="#araink"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Árazás
          </a>
          <a
            href="#kapcsolat"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Kapcsolat
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-muted-foreground">
            <Link to="/login">Belépés</Link>
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/register">Regisztráció</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
