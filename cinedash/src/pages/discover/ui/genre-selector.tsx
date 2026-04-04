import { useCallback, useMemo } from 'react'

import { useGenres } from '@/entities/movie'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/shared/ui/combobox'

type GenreSelectorProps = {
  value: number[]
  onChange: (value: number[]) => void
}

export function GenreSelector({ value, onChange }: GenreSelectorProps) {
  const anchor = useComboboxAnchor()
  const { data: genresById, isLoading } = useGenres()

  const genreItems = useMemo(
    () =>
      Object.entries(genresById ?? {})
        .map(([id, name]) => ({ id: Number(id), name }))
        .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
    [genresById],
  )

  const selectedValues = useMemo(() => value.map(String), [value])

  const handleValueChange = useCallback(
    (nextValue: string[] | string) => {
      const normalized = Array.isArray(nextValue) ? nextValue : [nextValue]
      onChange(
        normalized.map((id) => Number(id)).filter((id) => Number.isInteger(id)),
      )
    },
    [onChange],
  )

  return (
    <Combobox
      multiple
      autoHighlight
      items={genreItems.map((genre) => String(genre.id))}
      value={selectedValues}
      onValueChange={handleValueChange}
    >
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(genreValues) => (
            <>
              {genreValues.map((genreValue: string) => (
                <ComboboxChip key={genreValue}>
                  {genresById?.[Number(genreValue)] ?? genreValue}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>
          {isLoading ? 'Carregando gêneros...' : 'Nenhum gênero encontrado.'}
        </ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {genresById?.[Number(item)] ?? item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
