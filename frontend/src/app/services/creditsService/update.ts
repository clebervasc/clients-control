import { CreditOperationType } from '../../entities/Credits'
import { httpClient } from '../httpClient'

export interface CreateCreditParams {
  creditId: string
  serverId: string
  date: string
  operation: CreditOperationType
  quantity: number
  amount: number
}

export async function update({ creditId, ...params }: CreateCreditParams) {
  const { data } = await httpClient.put(`/credits/${creditId}`, params)

  return data
}
