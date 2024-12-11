import { Client } from '../../entities/Clients'
import { httpClient } from '../httpClient'

export async function getById(clientId: string) {
  const { data } = await httpClient.get<Client>(`/clients/${clientId}`)

  return data
}
