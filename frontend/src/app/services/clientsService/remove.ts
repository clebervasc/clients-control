import { httpClient } from '../httpClient'

export async function remove(clientId: string) {
  const { data } = await httpClient.delete(`/clients/${clientId}`)

  return data
}
