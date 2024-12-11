import { httpClient } from '../httpClient'

export interface RenewClientParams {
  clientId: string
  plan: 'monthly' | 'bimonthly' | 'quarterly' | 'halfYearly' | 'annual'
}

export async function renew({ clientId, ...params }: RenewClientParams) {
  const { data } = await httpClient.patch(`/clients/${clientId}`, params)

  return data
}
