import { FC, useRef } from 'react'
import { AriaSliderProps, useNumberFormatter, useSlider } from 'react-aria'
import { useSliderState } from 'react-stately'

import SliderThumb from './SliderThumb'

interface Props extends AriaSliderProps {
  name?: string
}

const Slider: FC<Props> = (props) => {
  const { name, label } = props

  const trackRef = useRef(null)
  const numberFormatter = useNumberFormatter()
  const state = useSliderState({ ...props, numberFormatter })
  const { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef,
  )

  return (
    <div {...groupProps} className={`slider ${state.orientation} w-full`}>
      {/* Create a container for the label and output element. */}
      {label && (
        <div className='label-container flex justify-between'>
          <label {...labelProps}>{label}</label>
          <output {...outputProps}>{state.getThumbValueLabel(0)}</output>
        </div>
      )}
      {/* The track element holds the visible track line and the thumb. */}
      <div
        {...trackProps}
        ref={trackRef}
        className={`track ${state.isDisabled ? 'disabled' : ''} h-1 bg-gray-500`}
      >
        <SliderThumb index={0} state={state} trackRef={trackRef} name={name} />
      </div>
    </div>
  )
}

export default Slider
