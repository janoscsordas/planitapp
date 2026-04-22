import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { Toaster } from 'sonner'
import NotFoundRoot from '../components/not-found/not-found-root'
import type { MyRouterContext } from '#/main'

import '../styles.css'
import { TooltipProvider } from '#/components/ui/tooltip'

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFoundRoot,
})


function RootComponent() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Outlet />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Toaster position="top-center" richColors />
      </TooltipProvider>
    </QueryClientProvider>
  )
}
