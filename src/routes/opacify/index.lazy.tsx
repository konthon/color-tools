import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { opacify, parseToRgba, readableColorIsBlack } from 'color2k'
import { FC, useDeferredValue, useMemo, useState } from 'react'
import { SketchPicker } from 'react-color'
import { Helmet } from 'react-helmet-async'

import { Slider } from 'components/Slider'
import { cn } from 'utils/style'

import CopyableResult from './components/CopyableResult'

const HEX_COLOR_PATTERN = '^#(?:[0-9a-fA-F]{3,4}){1,2}$'
const WHITE_BACKGROUND = [255, 255, 255]
const getWhiteBlended = ([r, g, b, a]: [number, number, number, number]) => [
  Math.round((1 - a) * WHITE_BACKGROUND[0] + a * r),
  Math.round((1 - a) * WHITE_BACKGROUND[1] + a * g),
  Math.round((1 - a) * WHITE_BACKGROUND[2] + a * b),
]
const getHex = (color: number[]) =>
  `#${color.map((c) => c.toString(16).padStart(2, '0')).join('')}`

const validateColorInput = (value: string) => {
  const newHexCode = (value.match(/^#*[0-9a-fA-F]{0,6}/) || []).join('')
  if (newHexCode.startsWith('#')) {
    return newHexCode.slice(0, 7)
  }
  return `#${newHexCode.slice(0, 6)}`
}

const OpacifyPage: FC = () => {
  const router = useRouter()
  const [hexCode, setHexCode] = useState('#FFFFFF')
  const [opacity, setOpacity] = useState(100)
  const deferredHexCode = useDeferredValue(hexCode.padEnd(7, 'F'))

  const opacified = useMemo(
    () =>
      getHex(
        getWhiteBlended(
          parseToRgba(opacify(deferredHexCode, -(100 - opacity) / 100)),
        ),
      ).toUpperCase(),

    [deferredHexCode, opacity],
  )
  const alphaAdded = useMemo(
    () =>
      `${deferredHexCode}${Math.round((opacity / 100) * 255)
        .toString(16)
        .padStart(2, '0')}`.toUpperCase(),
    [deferredHexCode, opacity],
  )

  const isBlack = useMemo(() => readableColorIsBlack(opacified), [opacified])

  return (
    <>
      <Helmet>
        <title>Opacify | Color tools</title>
      </Helmet>
      <div
        className={cn('text-white transition-colors duration-500', {
          'text-black': isBlack,
        })}
        style={{ backgroundColor: opacified }}
      >
        <div className='px-4 md:container md:mx-auto'>
          <main className='min-w-dvw flex h-full min-h-dvh w-full flex-col items-start justify-center py-12'>
            <button
              type='button'
              onClick={router.history.back}
              className='mb-2 flex opacity-50'
            >
              <ArrowLeftIcon className='size-6 flex-shrink-0' />
              <span>back</span>
            </button>
            <h1 className='mb-4 text-3xl font-semibold'>Opacify color</h1>
            <div className='flex w-full flex-col gap-8 md:flex-row md:gap-20'>
              <div className='flex-grow'>
                <div className='flex items-center font-mono text-5xl'>
                  <div className='opacity-30'>#</div>
                  <input
                    pattern={HEX_COLOR_PATTERN}
                    autoCapitalize='off'
                    autoComplete='off'
                    size={6}
                    value={hexCode.slice(1)}
                    onChange={(e) => {
                      setHexCode(validateColorInput(e.target.value))
                    }}
                    placeholder='FFFFFF'
                    className='bg-transparent uppercase outline-none'
                  />
                  <input
                    type='color'
                    value={hexCode.padEnd(7, 'F')}
                    onChange={(e) => {
                      const newHexCode = e.target.value
                      setHexCode(newHexCode)
                    }}
                  />
                </div>
                <Slider
                  label='opacity'
                  value={opacity}
                  onChange={(newOpacity) => {
                    if (typeof newOpacity === 'number') {
                      setOpacity(newOpacity)
                    }
                  }}
                />
                <input
                  placeholder={`${opacity}%`}
                  className='bg-transparent outline-none'
                />
              </div>
              <div className='flex flex-grow flex-col gap-2'>
                <div className='text-lg font-medium'>Result</div>
                <CopyableResult label='White Blended' value={opacified} />
                <CopyableResult label='Alpha Added' value={alphaAdded} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export const Route = createLazyFileRoute('/opacify/')({
  component: OpacifyPage,
})
