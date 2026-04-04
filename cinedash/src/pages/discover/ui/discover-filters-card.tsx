import { IconFilter2 } from '@tabler/icons-react'
import type { UseFormReturn } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { TextField } from '@/shared/ui/text-field'

import type { DiscoverFilterForm } from './discover-types'
import { GenreSelector } from './genre-selector'
import { SliderControlled } from './rating-slider'

type DiscoverFiltersCardProps = {
  form: UseFormReturn<DiscoverFilterForm>
  onSubmit: (data: DiscoverFilterForm) => void
  onReset: () => void
}

export function DiscoverFiltersCard({
  form,
  onSubmit,
  onReset,
}: DiscoverFiltersCardProps) {
  const voteAverageGte = form.watch('vote_average.gte')
  const voteAverageLte = form.watch('vote_average.lte')
  const ratingRange: number[] = [voteAverageGte ?? 0, voteAverageLte ?? 10]

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconFilter2 size={24} />
          Filtros
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} id="filter-form">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="with_genres">Gêneros</FieldLabel>
              <Controller
                name="with_genres"
                control={form.control}
                render={({ field }) => (
                  <GenreSelector
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </Field>

            <SliderControlled
              value={ratingRange}
              onChange={([gte, lte]) => {
                form.setValue('vote_average.gte', gte, {
                  shouldDirty: true,
                })
                form.setValue('vote_average.lte', lte, {
                  shouldDirty: true,
                })
              }}
            />

            <div className="grid grid-cols-2 gap-2">
              <Controller
                name="primary_release_year"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ''}
                    onChange={(event) => {
                      const value = event.target.value
                      field.onChange(value === '' ? undefined : Number(value))
                    }}
                    id="primary_release_year"
                    label="Ano de Lançamento"
                    type="number"
                    placeholder="Ex: 2005"
                    min={0}
                    error={fieldState.error}
                  />
                )}
              />
            </div>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-2">
        <Button variant="ghost" type="button" onClick={onReset}>
          Limpar Filtro
        </Button>
        <Button type="submit" form="filter-form" variant="default">
          Buscar
        </Button>
      </CardFooter>
    </Card>
  )
}
