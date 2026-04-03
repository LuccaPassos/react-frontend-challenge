import { IconBookmark, IconStarFilled } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'

type MovieCardProps = {
  id: string
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

  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  return (
    <div className="relative flex flex-col w-full max-w-62.5 cursor-pointer">
      <Link
        to="/movie/$movieId"
        params={{
          movieId: id,
        }}
      >
        <Card className="pb-0">
          <img src={imageSrc} alt={title} />
        </Card>

        <Button
          variant="secondary"
          size="icon"
          className="absolute top-3 right-3"
          aria-label="Adicionar à watchlist"
          onClick={handleBookmarkClick}
        >
          <IconBookmark />
        </Button>

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
