import { httpClient } from '../httpClient'

export async function remove(messageId: string) {
  const { data } = await httpClient.delete(`/messages/${messageId}`)

  return data
}
