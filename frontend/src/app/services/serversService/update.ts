import { httpClient } from '../httpClient'

export interface UpdateServerParams {
  serverId: string
  name: string
  monthlyPrice: number
  bimonthlyPrice: number
  quarterlyPrice: number
  halfYearlyPrice: number
  annualPrice: number
}

export async function update({ serverId, ...params }: UpdateServerParams) {
  const { data } = await httpClient.put(`/servers/${serverId}`, params)

  return data
}
