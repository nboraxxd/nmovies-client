import AuthButton from '@/components/auth-button'
import { PATH } from '@/constants/path'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="flex h-header-height items-center justify-between">
      <div className="container flex items-center text-primary-foreground sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="nmovies logo" className="size-8" />
          <span className="hidden sm:inline-block">nmovies</span>
        </Link>
        <nav className="ml-3 sm:ml-10">
          <ul className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            <li>
              <Link to={PATH.MOVIES} className="px-2 py-1">
                Movies
              </Link>
            </li>
            <li>
              <Link to={PATH.TVS} className="px-2 py-1">
                TV Series
              </Link>
            </li>
          </ul>
        </nav>
        <AuthButton />
      </div>
    </header>
  )
}
