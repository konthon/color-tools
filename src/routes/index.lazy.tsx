import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { FC } from 'react'

const Home: FC = () => (
  <div className='px-4 md:container md:mx-auto'>
    <h1 className='text-5xl font-bold'>Color tools</h1>
    <Link to='/opacify'>Opacify</Link>
  </div>
)

export const Route = createLazyFileRoute('/')({
  component: Home,
})
