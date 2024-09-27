import MoviesHero from '@/components/movies-hero'
import TopRatedSection from '@/components/top-rated-section'
import TrendingSection from '@/components/trending-section'

export default function Homepage() {
  return (
    <>
      <MoviesHero />
      <main className="container sm:px-6 lg:px-8">
        <TrendingSection />
        <TopRatedSection />
      </main>
    </>
  )
}
