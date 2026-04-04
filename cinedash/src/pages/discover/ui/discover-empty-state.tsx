import { IconMovie } from '@tabler/icons-react'

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/ui/empty'

export function DiscoverEmptyState() {
  return (
    <main className="flex-1 col-span-4 flex items-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconMovie />
          </EmptyMedia>
          <EmptyTitle>Nenhum filme por aqui</EmptyTitle>
          <EmptyDescription>
            Experimente ajustar os filtros ou procure por outro título para
            encontrar o que deseja.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </main>
  )
}
