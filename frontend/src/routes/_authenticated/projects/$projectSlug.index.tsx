import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/projects/$projectSlug/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/projects/$projectSlug"!</div>
}
