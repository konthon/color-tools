import { createRootRoute, Outlet } from '@tanstack/react-router'
import { FC, lazy } from 'react'
import { Helmet } from 'react-helmet-async'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      )

const Root: FC = () => (
  <>
    {/* <div className='flex gap-2 p-2'>
      <Link to='/' className='[&.active]:font-bold'>
        Home
      </Link>
    </div>
    <hr /> */}
    <Helmet>
      <title>Color tools</title>
    </Helmet>
    <Outlet />
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: () => <div>Not found</div>,
})
