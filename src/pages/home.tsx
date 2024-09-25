import MediaList from '@/components/media-list'
import MoviesHero from '@/components/movies-hero'

export default function Homepage() {
  return (
    <>
      <MoviesHero />
      <main className="container sm:px-6 lg:px-8">
        <MediaList />
      </main>
    </>
  )
}
