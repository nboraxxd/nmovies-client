import { useGetDiscoverQuery } from '@/lib/tanstack-query/use-discover'
import { Link } from 'react-router-dom'

export default function Homepage() {
  const getDiscoverQuery = useGetDiscoverQuery({ mediaType: 'movie' }, { page: 1, sortBy: 'popularity.desc' })
  console.log('🔥 ~ Homepage ~ getDiscoverQuery:', getDiscoverQuery)

  return (
    <>
      <div className="relative">
        <img
          src="https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg"
          alt=""
          className="h-[calc(100vh-var(--header-height))] w-screen object-cover"
        />
        <div className="absolute bottom-[10%] left-8 flex max-w-[90vw] flex-col gap-3 sm:gap-5 md:max-w-[420px]">
          <h2 className="mb-2 font-bold sm:text-[2vw]">Deadpool & Wolverine</h2>
          <div>PG13</div>
          <p className="text-[1.2vw]">2024-07-24</p>
          <div>
            <p>Overview</p>
            <p className="line-clamp-4 text-sm leading-relaxed md:line-clamp-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid cupiditate vero, exercitationem quia
              quibusdam incidunt voluptates quae repudiandae rem. Totam in saepe, nisi tempore reprehenderit accusantium
              nostrum, molestias, deserunt dolorum illum repellat nulla placeat id repellendus eveniet! Dolore deleniti
              quae eum vitae impedit reiciendis accusamus provident sit, repellat officiis ratione incidunt, eos animi
              quis rem nisi cumque nobis. Architecto ut pariatur nesciunt quidem, officia maxime libero modi, natus rem
              error voluptatem necessitatibus. Corporis eius dignissimos veniam totam ipsum, fugiat officia!
            </p>
          </div>
          <div>
            <button>Trailer</button>
            <Link to="/movie/1">View Detail</Link>
          </div>
        </div>
      </div>
      <main className="container sm:px-6 lg:px-8"></main>
    </>
  )
}
