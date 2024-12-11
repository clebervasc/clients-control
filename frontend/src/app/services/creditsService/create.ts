import { CreditOperationType } from '../../entities/Credits'
import { httpClient } from '../httpClient'

export interface CreateCreditParams {
  serverId: string
  date: string
  operation: CreditOperationType
  quantity: number
  amount: number
}

export async function create(params: CreateCreditParams) {
  const { data } = await httpClient.post('/credits', params)

  return data
}
