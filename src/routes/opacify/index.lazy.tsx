import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { FC, useDeferredValue, useState } from 'react'

const OpacifyPage: FC = () => {
  const router = useRouter()
  const [hexCode, setHexCode] = useState('#FFFFFF')
  const deferredHexCode = useDeferredValue(hexCode)
  return (
    <div style={{ backgroundColor: deferredHexCode }}>
      <div className='px-4 md:container md:mx-auto'>
        <div className='min-w-dvw flex h-full min-h-dvh w-full flex-col items-start justify-center'>
          <button type='button' onClick={router.history.back}>
            Back
          </button>
          <h1 className='mb-4 text-3xl font-semibold'>Opacify color</h1>
          <div className='flex gap-4'>
            <div className='flex items-center gap-1 font-mono text-5xl'>
              <div>#</div>
              <input
                pattern='^#(?:[0-9a-fA-F]{3,4}){1,2}$'
                autoCapitalize='off'
                autoComplete='off'
                width={5}
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
                className='bg-transparent uppercase outline-none'
              />
              <input
                type='color'
                value={hexCode}
                onChange={(e) => {
                  const newHexCode = e.target.value
                  setHexCode(newHexCode)
                }}
              />
            </div>
            <div>
              <input
                placeholder='100%'
                className='bg-transparent outline-none'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createLazyFileRoute('/opacify/')({
  component: OpacifyPage,
})
