import { Link } from 'react-router-dom'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Props {
  id: number
  name: string
  character: string
  avatarUrl?: string
}

export default function CastCard({ character, id, name, avatarUrl }: Props) {
  return (
    <Card key={id}>
      <Link to="/">
        <Avatar asChild className="size-full rounded-none">
          <AspectRatio ratio={4 / 5}>
            <AvatarImage src={avatarUrl} alt={name} className="size-full rounded-t-xl object-cover" />
            <AvatarFallback className="rounded-none rounded-t-xl">{name}</AvatarFallback>
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
