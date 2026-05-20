import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { authClient } from './lib/auth-client'
import { Spinner } from './components/ui/spinner';

export interface MyRouterContext {
  auth: typeof authClient.$Infer.Session | null;
}

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: {
    auth: undefined!
  }
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  const { data: session, isPending } = authClient.useSession()

  // While we check the session, we should show a loading state
  if (isPending) {
    return <Spinner />
  }

  return (
    <RouterProvider 
      router={router} 
      context={{ 
        auth: session ?? null
      }} 
    />
  )
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
