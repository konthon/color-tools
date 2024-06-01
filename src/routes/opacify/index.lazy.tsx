import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { opacify, parseToRgba, readableColorIsBlack } from 'color2k'
import { FC, useDeferredValue, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Slider } from 'components/Slider'
import { cn } from 'utils/style'

const getBlendedAlpha = ([r, g, b, a]: [number, number, number, number]) => [
  Math.round((1 - a) * 255 + a * r),
  Math.round((1 - a) * 255 + a * g),
  Math.round((1 - a) * 255 + a * b),
]
const getHex = (color: number[]) =>
  `#${color.map((c) => c.toString(16).padStart(2, '0')).join('')}`

const OpacifyPage: FC = () => {
  const router = useRouter()
  const [hexCode, setHexCode] = useState('#FFFFFF')
  const [opacity, setOpacity] = useState(100)
  const deferredHexCode = useDeferredValue(hexCode)

  const opacified = useMemo(
    () =>
      getHex(
        getBlendedAlpha(
          parseToRgba(
            opacify(deferredHexCode.padEnd(7, 'F'), -(100 - opacity) / 100),
          ),
        ),
      ),

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
          <div className='min-w-dvw flex h-full min-h-dvh w-full flex-col items-start justify-center'>
            <button
              type='button'
              onClick={router.history.back}
              className='mb-2 flex opacity-50'
            >
              <ArrowLeftIcon className='size-6 flex-shrink-0' />
              <span>back</span>
            </button>
            <h1 className='mb-4 text-3xl font-semibold'>Opacify color</h1>
            <div className='flex gap-4'>
              <div>
                <div className='flex items-center gap-1 font-mono text-5xl'>
                  <div>#</div>
                  <input
                    pattern='^#(?:[0-9a-fA-F]{3,4}){1,2}$'
                    autoCapitalize='off'
                    autoComplete='off'
                    value={hexCode.slice(1)}
                    onChange={(e) => {
                      const newHexCode = e.target.value
                      if (newHexCode.startsWith('#')) {
                        setHexCode(newHexCode)
                      } else {
                        setHexCode(`#${newHexCode}`)
                      }
                    }}
                    placeholder='FFFFFF'
                    className='bg-transparent uppercase underline decoration-from-font underline-offset-8 outline-none'
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
              <div>
                <div>Result</div>
                <div className='font-mono'>
                  Alpha Blended - {opacified.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const Route = createLazyFileRoute('/opacify/')({
  component: OpacifyPage,
})
