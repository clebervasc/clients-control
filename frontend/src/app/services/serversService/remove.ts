import { httpClient } from '../httpClient'

export async function remove(serverId: string) {
  const { data } = await httpClient.delete(`/servers/${serverId}`)

  return data
}
