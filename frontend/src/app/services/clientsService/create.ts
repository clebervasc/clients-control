import { Client } from '../../entities/Clients'
import { httpClient } from '../httpClient'

export interface CreateClientParams
  extends Omit<Client, 'id' | 'userId' | 'server'> {}

export async function create(params: CreateClientParams) {
  const { data } = await httpClient.post('/clients', params)

  return data
}
