import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { FC } from 'react'

const Home: FC = () => (
  <div>
    <h3>Welcome to Color tools</h3>
    <Link to='/opacify'>- Go to Opacify</Link>
  </div>
)

export const Route = createLazyFileRoute('/')({
  component: Home,
})
