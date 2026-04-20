import LogOutButton from '#/components/auth/logout-button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard/projects/"! <Link to="/">Hazafele</Link> <LogOutButton /></div>
}
