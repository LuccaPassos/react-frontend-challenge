import { useState } from 'react'

import { FieldLabel } from './field'
import { Slider } from './slider'

export function ControlledSlider() {
  const [value, setValue] = useState<number[]>([5, 10])

  const handleValueText = (textValue: number[]) => {
    if (textValue[0] === textValue[1]) {
      return `Igual a ${textValue[0]}`
    }
    return `Entre ${textValue[0]} e ${textValue[1]}`
  }

  return (
    <div className="mx-auto grid w-full gap-3">
      <div className="flex items-center justify-between gap-2">
        <FieldLabel htmlFor="slider-demo-temperature">
          Pontuação dos Usuários
        </FieldLabel>
        <span className="text-sm text-muted-foreground">
          {handleValueText(value)}
        </span>
      </div>
      <Slider
        id="slider-demo-temperature"
        value={value}
        onValueChange={(v) => setValue(Array.isArray(v) ? v : [v])}
        min={0}
        max={10}
      />
    </div>
  )
}
