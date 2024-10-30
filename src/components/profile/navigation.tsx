import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { cn } from '@/utils'
import { PROFILE_NAV } from '@/constants'

export default function ProfileNav() {
  const MotionLink = motion.create(Link)

  const { pathname } = useLocation()

  return (
    <nav className="my-4 flex overflow-x-auto py-2">
      <ul className="mx-auto flex gap-3 text-xs font-semibold md:gap-6">
        {PROFILE_NAV.map((link) => {
          const Icon = link.icon

          return (
            <li key={link.to} className="relative">
              <MotionLink
                className={cn('flex flex-col items-center gap-1 px-2 py-1', pathname === link.to && 'text-primary')}
                to={link.to}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="size-5" />
                {link.label}
              </MotionLink>
              <AnimatePresence>
                {pathname === link.to ? (
                  <motion.div
                    className="absolute -bottom-1 left-0 z-0 h-0.5 w-full rounded-full bg-primary"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 35 }}
                  />
                ) : null}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
