import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-svh bg-background">
      
    </div>
  )
}
