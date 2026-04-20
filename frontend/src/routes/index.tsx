import { createFileRoute, Link } from '@tanstack/react-router'


export const Route = createFileRoute('/')({ component: App })


function App() {
  return (
    <main>
      <Link to="/projects">Hello Projekt</Link>
      <Link to="/login">Hello Login</Link>
    </main>
  )
}
