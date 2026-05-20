import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  loader: ({ context }) => {
    if (!context.auth) {
      throw redirect({ 
        to: "/login",
        search: {
          redirect: location.href
        }
      })
    }

    return { user: context.auth.user }
  }
})

function RouteComponent() {
  return <Outlet />
}
