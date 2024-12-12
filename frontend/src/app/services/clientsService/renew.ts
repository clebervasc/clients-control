import { httpClient } from '../httpClient'

export interface RenewClientParams {
  clientId: string
  plan: 'monthly' | 'bimonthly' | 'quarterly' | 'halfYearly' | 'annual'
}

export async function renew({ clientId, ...params }: RenewClientParams) {
  const plan = {
    plan: params.plan === 'halfYearly' ? 'half_yearly' : params.plan,
  }

  const { data } = await httpClient.patch(`/clients/${clientId}`, plan)

  return data
}
