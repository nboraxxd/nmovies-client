import { Link } from 'react-router-dom'

import { Skeleton } from '@/components/ui/skeleton'
import { LazyLoadImage } from '@/components/common'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

interface Props {
  id: number
  name: string
  character: string
  avatarUrl?: string
}

function CastCard({ character, id, name, avatarUrl }: Props) {
  return (
    <Card key={id}>
      <Link to={`/people/${id}`} className="flex h-full flex-col">
        <Avatar asChild className="size-full rounded-none rounded-t-xl">
          <AspectRatio ratio={4 / 5}>
            {avatarUrl ? (
              <LazyLoadImage src={avatarUrl} alt={name} className="rounded-t-xl" />
            ) : (
              <AvatarFallback className="rounded-none rounded-t-xl">{name}</AvatarFallback>
            )}
          </AspectRatio>
        </Avatar>
        <CardContent className="flex grow flex-col p-4">
          <CardTitle className="mb-1.5 leading-snug">{name}</CardTitle>
          <CardDescription className="mt-auto line-clamp-3 text-white">{character}</CardDescription>
        </CardContent>
      </Link>
    </Card>
  )
}

function CastCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <div className="relative p-0 pt-[125%]">
        <Skeleton className="absolute left-0 top-0 size-full rounded-t-xl" />
      </div>
      <div className="p-6">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="mt-2 h-5 w-3/4" />
      </div>
    </Card>
  )
}

export { CastCard, CastCardSkeleton }
