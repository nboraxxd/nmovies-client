import MovieCard from '@/components/movie-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function MediaList() {
  return (
    <div>
      <Tabs defaultValue="all" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="movie">Movie</TabsTrigger>
          <TabsTrigger value="tvShow">TV Show</TabsTrigger>
        </TabsList>
        <TabsContent value="all">All media will be listed here.</TabsContent>
        <TabsContent value="movie">Movie media will be listed here.</TabsContent>
        <TabsContent value="tvShow">TV Show media will be listed here.</TabsContent>
      </Tabs>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 xl:grid-cols-5">
        <MovieCard />
      </div>
    </div>
  )
}
