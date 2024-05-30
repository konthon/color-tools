import { createLazyFileRoute } from '@tanstack/react-router'
import { FC } from 'react'

const ThemePalettePage: FC = () => <div>Hello /theme/palette!</div>

export const Route = createLazyFileRoute('/theme/palette')({
  component: ThemePalettePage,
})
