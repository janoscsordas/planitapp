import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/forgot-password')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.auth) {
      throw redirect({
        to: '/',
      })
    }
  },
})

function RouteComponent() {
  return <div>Hello "/(auth)/forget-password"!</div>
}
