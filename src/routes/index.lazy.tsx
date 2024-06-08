import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { FC } from 'react'

const Home: FC = () => (
  <main className='flex min-h-dvh flex-col justify-center px-4 md:container md:mx-auto'>
    <div className='text-6xl'>🎨</div>
    <h1 className='mb-12 text-3xl font-medium'>Color tools</h1>
    <nav className='flex flex-col text-6xl font-bold [&_a:hover]:underline [&_a]:mb-6'>
      <Link to='/opacify'>Opacify</Link>
      <Link to='/theme/palette'>Generate Palette</Link>
    </nav>
  </main>
)

export const Route = createLazyFileRoute('/')({
  component: Home,
})
