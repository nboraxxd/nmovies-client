import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { cn } from '@/utils'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  id: number
  name: string
  character: string
  avatarUrl?: string
}

function CastCard({ character, id, name, avatarUrl }: Props) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <Card key={id}>
      <Link to="/">
        <Avatar asChild className="size-full rounded-none">
          <AspectRatio ratio={4 / 5}>
            {avatarUrl ? (
              <LazyLoadImage
                src={avatarUrl}
                alt={name}
                onLoad={() => setIsImageLoaded(true)}
                className={cn('size-full rounded-t-xl object-cover transition', {
                  'blur-md': !isImageLoaded,
                })}
              />
            ) : (
              <AvatarFallback className="rounded-none rounded-t-xl">{name}</AvatarFallback>
            )}
          </AspectRatio>
        </Avatar>
        <CardContent className="p-4">
          <CardTitle className="leading-snug">{name}</CardTitle>
          <CardDescription className="mt-2 line-clamp-3 text-white">{character}</CardDescription>
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
