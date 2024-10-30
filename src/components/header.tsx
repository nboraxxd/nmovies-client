import AuthButton from '@/components/auth-button'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="flex h-header-height items-center justify-between">
      <div className="container flex items-center justify-between text-primary-foreground sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="nmovies logo" className="size-8" />
          <span>nmovies</span>
        </Link>
        {/* <nav className="ml-10">
          <ul className="flex items-center gap-4 lg:gap-6">
            <li>
              <Link to="/" className="px-2 py-1">
                Movies
              </Link>
            </li>
            <li>
              <Link to="/" className="px-2 py-1">
                TV Series
              </Link>
            </li>
          </ul>
        </nav> */}
        <AuthButton />
      </div>
    </header>
  )
}
