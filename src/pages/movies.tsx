import { GenresMovieSelect, MovieList, RatingSelect, SortBySelect } from '@/components/medias'

export default function MoviesPage() {
  return (
    <main className="container mt-10 sm:px-6 lg:px-8">
      <h1 className="text-xl font-bold text-foreground md:text-2xl lg:text-3xl">Movies</h1>
      <GenresMovieSelect />
      <div className="mt-3 flex justify-end gap-3">
        <RatingSelect />
        <SortBySelect />
      </div>
      <MovieList />
    </main>
  )
}
