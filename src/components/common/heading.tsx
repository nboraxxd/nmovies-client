import { cn } from '@/utils'

export default function Heading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        'w-fit text-lg font-bold uppercase text-foreground sm:text-2xl',
        "relative mb-1.5 before:absolute before:-bottom-1.5 before:left-0 before:h-1 before:w-3/4 before:rounded-full before:bg-primary before:content-['']",
        className
      )}
    >
      {children}
    </h2>
  )
}
