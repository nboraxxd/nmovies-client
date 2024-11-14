import { GenresSelect } from '@/components/medias'

export default function MoviesPage() {
  return (
    <main className="container mt-10 sm:px-6 lg:px-8">
      <h1 className="text-xl font-bold text-foreground md:text-2xl lg:text-3xl">Movies</h1>
      <GenresSelect type="movie" />
    </main>
  )
}
