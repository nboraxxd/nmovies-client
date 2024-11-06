import { cn } from '@/utils'
import { useEffect, useState } from 'react'

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  width: number
  height: number
  className?: string
}

export default function ImageWithLoading({ src, width, height, className, ...rest }: Props) {
  const [currentSrc, setCurrentSrc] = useState(`https://placehold.co/${width}x${height}?text=Loading`)

  useEffect(() => {
    const img = new Image()
    if (src) {
      img.src = src
      img.onload = () => {
        setCurrentSrc(src)
      }
      return
    }

    setCurrentSrc(`https://placehold.co/${width}x${height}?text=No Image`)

    return () => {
      img.onload = null
    }
  }, [src, width, height])

  return (
    <img
      {...rest}
      className={cn(className, currentSrc === src || !src ? '' : 'blur-md')}
      src={currentSrc}
      width={width}
      height={height}
    />
  )
}
