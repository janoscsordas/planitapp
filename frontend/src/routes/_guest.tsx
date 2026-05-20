import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import z from 'zod'
import MeshBackground from '#/components/homepage/animated-mesh-background'

export const Route = createFileRoute('/_guest')({
  component: GuestLayout,
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth?.user) {
      throw redirect({
        to: search.redirect ?? "/projects",
        replace: true,
      })
    }
  }
})

function GuestLayout() {
  return (
    <main className='relative min-h-svh flex items-center justify-center px-4'>
      <MeshBackground />
      <Outlet />
    </main>
  )
}
