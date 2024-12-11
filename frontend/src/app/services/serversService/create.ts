import { httpClient } from '../httpClient'

export interface CreateServerParams {
  name: string
  monthlyPrice: number
  bimonthlyPrice: number
  quarterlyPrice: number
  halfYearlyPrice: number
  annualPrice: number
}

export async function create(params: CreateServerParams) {
  const { data } = await httpClient.post('/servers', params)

  return data
}
