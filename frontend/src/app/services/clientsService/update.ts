import { Client } from '../../entities/Clients'
import { httpClient } from '../httpClient'

export interface CreateClientParams extends Omit<Client, 'userId' | 'server'> {}

export async function update({ id, ...params }: CreateClientParams) {
  const { data } = await httpClient.put(`/clients/${id}`, params)

  return data
}
