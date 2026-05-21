import { Button } from '#/components/ui/button'
import { IconMoon } from '@tabler/icons-react'
import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import z from 'zod'

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
    <main className='relative min-h-svh w-full flex items-center justify-center px-4'>
      <nav className='absolute top-0 left-0 p-4 flex items-center gap-2 justify-between w-full'>
        <Link to="/" className='text-xl text-green-500 font-bold'>Planit<span className='text-foreground'>App</span></Link>

        <Button variant="outline" size="icon"><IconMoon /></Button>
      </nav>
      <div className='py-12 w-full flex items-center justify-center'>
        <Outlet />
      </div>
    </main>
  )
}
