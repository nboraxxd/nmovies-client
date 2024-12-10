import { useQuery } from '@tanstack/react-query'

import peopleApi from '@/apis/people.api'
import { QUERY_KEY } from '@/constants/tanstack-key'

export function useGetPersonDetailQuery(personId: number) {
  return useQuery({
    queryFn: () => peopleApi.getPersonDetail(personId),
    queryKey: [QUERY_KEY.PERSON_DETAIL, personId],
  })
}

export function useGetPersonCombinedCreditsQuery(personId: number) {
  return useQuery({
    queryFn: () => peopleApi.getPersonCombinedCredits(personId),
    queryKey: [QUERY_KEY.PERSON_COMBINED_CREDITS, personId],
  })
}
