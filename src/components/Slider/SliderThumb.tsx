import { FC, useRef } from 'react'
import {
  AriaSliderThumbOptions,
  VisuallyHidden,
  mergeProps,
  useFocusRing,
  useSliderThumb,
} from 'react-aria'
import { SliderState } from 'react-stately'

import { cn } from 'utils/style'

interface Props extends Omit<AriaSliderThumbOptions, 'inputRef'> {
  state: SliderState
}

const SliderThumb: FC<Props> = (props) => {
  const { state, trackRef, index, name } = props

  const inputRef = useRef(null)
  const { thumbProps, inputProps, isDragging } = useSliderThumb(
    { index, trackRef, inputRef, name },
    state,
  )

  const { focusProps, isFocusVisible } = useFocusRing()

  return (
    <div
      {...thumbProps}
      className={cn(
        'size-4 cursor-ew-resize rounded-full border border-black bg-white',
        thumbProps.className,
        { ring: isFocusVisible, 'bg-gray-100': isDragging },
      )}
    >
      <VisuallyHidden>
        <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
      </VisuallyHidden>
    </div>
  )
}

export default SliderThumb
