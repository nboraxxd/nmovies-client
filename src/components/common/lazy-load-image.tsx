import { useState } from 'react'
import { LazyLoadImage as Image } from 'react-lazy-load-image-component'

import { cn } from '@/utils'

interface Props {
  src: string
  alt: string
  className?: string
}

export default function LazyLoadImage({ src, alt, className }: Props) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <Image
      src={src}
      alt={alt}
      onLoad={() => setIsImageLoaded(true)}
      threshold={400}
      className={cn('size-full object-cover transition', className, {
        'blur-md': !isImageLoaded,
      })}
    />
  )
}
