import { IconFilter2, IconSearch } from '@tabler/icons-react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { ButtonGroup } from '@/shared/ui/button-group'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { TextField } from '@/shared/ui/text-field'

import { GenreSelector } from './genre-selector'
import { MovieCard } from './movie-card'
import { SliderControlled } from './rating-slider'

export function Discover() {
  const form = useForm()

  return (
    <div className="p-8 grid grid-cols-5 gap-x-12">
      <aside className="flex flex-col gap-6 col-start-1">
        <Field>
          <ButtonGroup>
            <Input placeholder="Procure um filme..." />
            <Button variant="outline" aria-label="Pesquisar filme">
              <IconSearch />
            </Button>
          </ButtonGroup>
        </Field>

        <div className="text-center text-sm  text-muted-foreground">OU</div>

        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconFilter2 size={24} />
              Filtros
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={() => {}} id="filter-form">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="genre">Gêneros</FieldLabel>
                  <GenreSelector />
                </Field>

                <SliderControlled />

                <div className="grid grid-cols-2 gap-2">
                  <Controller
                    name="releaseYear"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        id="release-year"
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
            <Button variant="ghost">Limpar Filtro</Button>
            <Button type="submit" variant="default">
              Buscar
            </Button>
          </CardFooter>
        </Card>
      </aside>

      <main className="flex-1 col-span-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-balance mb-6">
          Populares
        </h1>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-10">
          <MovieCard
            id="1"
            imageSrc="https://image.tmdb.org/t/p/w600_and_h900_face/t1DQ4XXIqTm5LvUjz8jypN43JjZ.jpg"
            title="O Agente Secreto"
            releaseYear={2025}
            rating={7.3}
          />
        </div>
      </main>
    </div>
  )
}
