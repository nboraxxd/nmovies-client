import { GetPersonCombinedCreditsResponseType, GetPersonDetailResponseType } from '@/lib/schemas/people.schema'
import http from '@/utils/http'

const PEOPLE_PREFIX = '/people'

const peopleApi = {
  getPersonDetail: async (personId: number) => {
    return http.get<GetPersonDetailResponseType>(`${PEOPLE_PREFIX}/${personId}`)
  },
  getPersonCombinedCredits: async (personId: number) => {
    return http.get<GetPersonCombinedCreditsResponseType>(`${PEOPLE_PREFIX}/${personId}/combined-credits`)
  },
}

export default peopleApi
