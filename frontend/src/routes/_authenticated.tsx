import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth) {
      throw redirect({ to: "/login" })
    }
  }
})

function RouteComponent() {
  return <Outlet />
}
