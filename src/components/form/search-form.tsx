import { useForm } from 'react-hook-form'
import { SearchIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { SEARCH_TABS } from '@/constants'
import { searchSchema, SearchType } from '@/lib/schemas/search.schema'

import { useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import useSanitizeSearch from '@/hooks/use-sanitize-search'
import { useCallback, useEffect } from 'react'
import useDebounce from '@/hooks/use-debounce'

export default function SearchForm() {
  const navigate = useNavigate()

  const { query, type } = useSanitizeSearch()

  const form = useForm<Omit<SearchType, 'page'>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: query ?? '',
      type: type ?? 'movie',
    },
  })

  const search = form.watch('query')

  const debouncedQuery = useDebounce(search ?? '', 500)

  const onValid = useCallback(
    ({ type, query }: SearchType) => {
      return navigate({
        search: queryString.stringify({ query, type }, { skipEmptyString: true }),
      })
    },
    [navigate]
  )

  useEffect(() => {
    onValid({ type, query: debouncedQuery })
  }, [debouncedQuery, onValid, type])

  return (
    <Form {...form}>
      <form className="mx-auto w-full max-w-4xl space-y-2" noValidate>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Tabs
                  className="text-center"
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value)
                    form.handleSubmit(onValid)()
                  }}
                >
                  <TabsList className="border-none">
                    {SEARCH_TABS.map(({ name, value }) => (
                      <TabsTrigger key={value} value={value} className="px-5 py-2">
                        {name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Search for movies, tv shows or people"
                    type="text"
                    autoComplete="off"
                    className="inline-block h-14 p-4 pr-12"
                  />
                  <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
