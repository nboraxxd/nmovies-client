import { Link } from 'react-router-dom'
import { SearchIcon } from 'lucide-react'

import { PATH } from '@/constants/path'

import { Button } from '@/components/ui/button'
import { AuthButton } from '@/components/auth-button'

export default function Header() {
  return (
    <header className="flex h-header-height items-center justify-between">
      <div className="container flex items-center text-primary-foreground sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="nmovies logo" className="size-8" />
          <span className="hidden sm:inline-block">nmovies</span>
        </Link>
        <nav className="mx-3 flex-1 sm:mx-10">
          <ul className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            <li>
              <Link to={PATH.MOVIES} className="p-1 text-sm sm:px-2 sm:text-base">
                Movies
              </Link>
            </li>
            <li>
              <Link to={PATH.TVS} className="p-1 text-sm sm:px-2 sm:text-base">
                TV Shows
              </Link>
            </li>
            <li className="ml-auto">
              <Button variant="ghost" size="icon" className="size-8 hover:bg-accent/30 sm:size-9" asChild>
                <Link to={PATH.SEARCH}>
                  <SearchIcon className="size-6" />
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
        <AuthButton />
      </div>
    </header>
  )
}
