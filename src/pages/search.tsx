import { SearchForm } from '@/components/form'
import { SearchResults } from '@/components/search'

export default function SearchPage() {
  return (
    <main className="container mt-10 flex-1 sm:px-6 lg:px-8">
      <SearchForm />
      <SearchResults />
    </main>
  )
}
