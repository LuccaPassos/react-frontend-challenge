import { IconMovie, IconStarFilled } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'

import { Card } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

type MovieCardProps = {
  id: number
  imageSrc: string
  title: string
  releaseYear: number
  rating: number
}

export function MovieCard({
  id,
  imageSrc,
  title,
  releaseYear,
  rating,
}: MovieCardProps) {
  const formattedRating = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(rating)

  return (
    <div className="relative flex flex-col w-full max-w-62.5 cursor-pointer">
      <Link
        to="/movie/$movieId"
        params={{
          movieId: `${id}`,
        }}
      >
        <Card className="pb-0">
          <img src={imageSrc} alt={title} className="w-full aspect-2/3 z-1" />
          <IconMovie
            size={48}
            className="absolute top-[calc(50%-48px)] left-1/2 -translate-x-1/2 -translate-y-1/2 text-foreground opacity-20"
          />
        </Card>

        <div className="p-2 flex flex-col gap-3">
          <div className=" flex justify-between items-start">
            <p className="text-sm  text-muted-foreground">{releaseYear}</p>
            <span className="flex items-center gap-1  text-sm">
              <IconStarFilled size={16} className="text-amber-500" />
              {formattedRating}
            </span>
          </div>
          <h3 className="font-bold text-foreground">{title}</h3>
        </div>
      </Link>
    </div>
  )
}

export function MovieCardSkeleton() {
  return (
    <div className="relative flex flex-col w-full max-w-62.5">
      <Card className="py-0">
        <Skeleton className="w-full aspect-2/3 z-1" />
        <IconMovie
          size={48}
          className="absolute top-[calc(50%-48px)] left-1/2 -translate-x-1/2 -translate-y-1/2 text-foreground opacity-20  "
        />
      </Card>

      <div className="p-2 flex flex-col gap-4">
        <div className=" flex justify-between items-start">
          <Skeleton className="h-4 w-12" />
          <span className="flex items-center gap-1  text-sm">
            <IconStarFilled size={16} className="text-muted" />
            <Skeleton className="h-4 w-5" />
          </span>
        </div>
        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  )
}
