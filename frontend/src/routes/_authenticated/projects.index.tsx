import UserAvatar from '#/components/user/user-avatar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { auth } = Route.useRouteContext()

  return (
    <div className="min-h-svh bg-background">
      <UserAvatar user={auth!.user} />
    </div>
  )
}
