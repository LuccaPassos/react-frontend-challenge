import { Card } from '@/shared/ui/card'

type CastCardProps = {
  name: string
  character: string
  imageSrc: string | null
}

export function CastCard({ name, character, imageSrc }: CastCardProps) {
  return (
    <Card className="flex flex-col gap-2 min-w-40 w-40 pb-2">
      <img
        src={`https://image.tmdb.org/t/p/w185${imageSrc}`}
        alt="Foto do ator"
        className=" aspect-2/3 object-cover"
      />
      <div className="px-2 flex flex-col gap-2">
        <p className="font-bold">{name}</p>
        <p className="text-sm text-muted-foreground">{character}</p>
      </div>
    </Card>
  )
}
