import { CircularProgressBar } from '@/components/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function MovieCard() {
  return (
    <Card>
      <CardHeader className="relative p-0 pt-[150%]">
        <img
          src="https://image.tmdb.org/t/p/w500/58QT4cPJ2u2TqWZkterDq9q4yxQ.jpg"
          alt="Movie Poster"
          className="absolute left-0 top-0 size-full rounded-xl object-cover"
        />
      </CardHeader>
      <CardContent className="relative">
        <CircularProgressBar percent={90} className="absolute -top-6" />
        <CardTitle>Lorem ipsum dolor sit amet consectetur.</CardTitle>
        <CardDescription>Lorem ipsum dolor sit.</CardDescription>
      </CardContent>
    </Card>
  )
}
