import { Field, FieldTitle } from '@/shared/ui/field'
import { Slider } from '@/shared/ui/slider'

type SliderControlledProps = {
  value: number[]
  onChange: (value: number[]) => void
}

export function SliderControlled({ value, onChange }: SliderControlledProps) {
  const handleValueText = (v: number[]) => {
    if (v[0] === v[1]) {
      return `Igual a ${v[0]}`
    }
    return `Entre ${v[0]} e ${v[1]}`
  }

  return (
    <Field className="w-full">
      <FieldTitle className="flex justify-between items-center">
        Pontuação dos Usuários
        <span className="text-sm text-muted-foreground">
          {handleValueText(value)}
        </span>
      </FieldTitle>

      <Slider
        value={value}
        onValueChange={(v) => onChange(Array.isArray(v) ? v : [v])}
        min={0}
        max={10}
        className="mt-0.5 w-full"
        aria-label="Pontuação dos Usuários"
      />
    </Field>
  )
}
