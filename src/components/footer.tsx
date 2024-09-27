import { Link } from 'react-router-dom'

import { FOOTER_LINKS } from '@/constants'
import FooterImg from '/footer-bg.webp'

export default function Footer() {
  return (
    <footer
      style={{
        backgroundImage: `
            linear-gradient(rgba(0,0,0,0.075), rgba(0,0,0,0.075))
        , url(${FooterImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className="mt-10 w-full py-8 lg:py-16"
    >
      <div className="flex flex-col items-center gap-8 md:gap-12 lg:gap-14">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="nmovies logo" className="size-8" />
          <span>nmovies</span>
        </Link>
        <ul className="grid grid-cols-3 items-center justify-start gap-1 font-medium capitalize text-gray-300 md:gap-4 md:gap-x-16">
          {FOOTER_LINKS.map((title, index) => {
            return (
              <li key={index} className="text-center">
                <Link to="/" className="text-xs transition hover:text-primary hover:underline md:text-base">
                  {title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </footer>
  )
}
