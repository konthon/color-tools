import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { useCopy } from 'hooks/useCopy'
import { FC } from 'react'

interface Props {
  label: string
  value: string
}

const CopyableResult: FC<Props> = (props) => {
  const { label, value } = props
  const { onCopy, hasCopied } = useCopy(value)
  return (
    <div>
      <h3 className='opacity-50'>{label}</h3>
      <div className='flex items-center gap-2'>
        <p className='font-mono text-3xl font-medium'>{value}</p>
        <button
          type='button'
          aria-label='copy'
          className='flex-shrink-0 rounded-md bg-slate-200/30 p-2 hover:bg-slate-300/30'
          onClick={onCopy}
        >
          {hasCopied ? (
            <CheckIcon className='size-4' />
          ) : (
            <DocumentDuplicateIcon className='size-4' />
          )}
        </button>
      </div>
    </div>
  )
}

export default CopyableResult
