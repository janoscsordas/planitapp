import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/projects/create')({
  component: CreateProjectPage,
})

function CreateProjectPage() {
  

  return (
    <div className='min-h-svh bg-background flex items-center justify-center p-4'>
      <div className='w-full max-w-xl'>
        <div className='mb-8 text-center'>
          <h1 className='text-2xl font-semibold mb-2'>Új Projekt Készítése</h1>
          <p className='text-muted-foreground text-sm'>Töltsd ki az alábbi űrlapot az új projekt létrehozásához</p>
        </div>

        <form >

        </form>
      </div>
    </div>
  )
}
