'use client'

import { type ReactNode, useCallback } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination'

import useFilteredMediaParams from '@/hooks/use-filtered-media-params'
import { DiscoverMoviesQueryType } from '@/lib/schemas/movies.schema'
import queryString from 'query-string'

export interface PaginationWithLinksProps {
  totalPage: number
  page: number
  pageSearchParam?: string
}

export function PaginationWithLinks({ totalPage, page, pageSearchParam }: PaginationWithLinksProps) {
  const filteredMediaParams = useFilteredMediaParams<DiscoverMoviesQueryType>()

  const buildSearchParams = useCallback(
    (newPage: number) => {
      const key = pageSearchParam || 'page'

      return queryString.stringify({
        ...filteredMediaParams,
        [key]: newPage,
      })
    },
    [filteredMediaParams, pageSearchParam]
  )

  const renderPageNumbers = () => {
    const items: ReactNode[] = []
    const maxVisiblePages = 5

    if (totalPage <= maxVisiblePages) {
      for (let i = 1; i <= totalPage; i++) {
        items.push(
          <PaginationItem key={i} className="hidden sm:list-item">
            <PaginationLink to={{ search: buildSearchParams(i) }} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      items.push(
        <PaginationItem key={1} className="hidden sm:list-item">
          <PaginationLink to={{ search: buildSearchParams(1) }} isActive={page === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      )

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start" className="hidden sm:list-item">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      const start = Math.max(2, page - 1)
      const end = Math.min(totalPage - 1, page + 1)

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i} className="hidden sm:list-item">
            <PaginationLink to={{ search: buildSearchParams(i) }} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }

      if (page < totalPage - 2) {
        items.push(
          <PaginationItem key="ellipsis-end" className="hidden sm:list-item">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      items.push(
        <PaginationItem key={totalPage} className="hidden sm:list-item">
          <PaginationLink to={{ search: buildSearchParams(totalPage) }} isActive={page === totalPage}>
            {totalPage}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

  return (
    <Pagination className="mt-5">
      <PaginationContent className="max-sm:gap-0" key="PaginationContent">
        <PaginationItem key="previous">
          <PaginationPrevious
            to={{ search: buildSearchParams(Math.max(page - 1, 1)) }}
            aria-disabled={page === 1}
            tabIndex={page === 1 ? -1 : undefined}
            className={page === 1 ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem key="next">
          <PaginationNext
            to={{ search: buildSearchParams(Math.min(page + 1, totalPage)) }}
            aria-disabled={page === totalPage}
            tabIndex={page === totalPage ? -1 : undefined}
            className={page === totalPage ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
