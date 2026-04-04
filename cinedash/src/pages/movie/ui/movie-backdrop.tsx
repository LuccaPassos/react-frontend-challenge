type MovieBackdropProps = {
  path: string | undefined
}

export function MovieBackdrop({ path }: MovieBackdropProps) {
  return (
    <div
      className="-my-10 -mx-20 w-full h-[80%] absolute -z-10"
      style={{
        backgroundImage: `
        linear-gradient(
          0deg, var(--background) 5%, color-mix(in srgb, var(--background), transparent 30%) 100%
        ),
        url(https://image.tmdb.org/t/p/original/${path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  )
}
