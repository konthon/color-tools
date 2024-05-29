import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { FC } from 'react'

const Root: FC = () => (
  <>
    {/* <div className='flex gap-2 p-2'>
      <Link to='/' className='[&.active]:font-bold'>
        Home
      </Link>
    </div>
    <hr /> */}
    <Outlet />
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: () => <div>Not found</div>,
})
