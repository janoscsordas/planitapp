import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/projects/$projectSlug/tasks')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/projects/$projectSlug/tasks"!</div>
}
