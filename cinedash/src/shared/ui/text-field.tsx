import type * as React from 'react'

import { Field, FieldError, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

type FieldErrorShape = { message?: string }

type TextFieldProps = Omit<React.ComponentProps<typeof Input>, 'id'> & {
  id: string
  label: string
  error?: FieldErrorShape
  fieldProps?: React.ComponentProps<typeof Field>
}

function TextField({
  id,
  label,
  error,
  fieldProps,
  ...inputProps
}: TextFieldProps) {
  const hasError = Boolean(error?.message)

  return (
    <Field data-invalid={hasError} {...fieldProps}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input id={id} aria-invalid={hasError} {...inputProps} />
      {hasError && <FieldError errors={[error]} />}
    </Field>
  )
}

export { TextField }
