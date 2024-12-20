import React from 'react'

import { cn } from '@/utils'

import { Button } from '@/components/ui/button'
import shyFace from '@/assets/images/shy-face.svg'

type Props = React.ComponentPropsWithoutRef<'div'> & { heading: string; desc?: string }

function NotFoundMedia({ heading, desc, className, children, ...props }: Props) {
  return (
    <div className={cn('mt-10 flex flex-col items-center', className)} {...props}>
      <img src={shyFace} alt="Not found media" className="w-28" />
      <div className="mt-3 text-center text-gray-500 md:text-xl">
        <p>{heading}</p>
        {desc ? <p className="mt-3">{desc}</p> : null}
      </div>
      {children}
    </div>
  )
}

function NotFoundMediaReset({ onClick }: { onClick: () => void }) {
  return (
    <Button className="mt-6" onClick={onClick}>
      Clear filter
    </Button>
  )
}

export { NotFoundMedia, NotFoundMediaReset }
