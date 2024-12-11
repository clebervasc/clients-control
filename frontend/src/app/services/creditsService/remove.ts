import { httpClient } from '../httpClient'

export async function remove(creditId: string) {
  const { data } = await httpClient.delete(`/credits/${creditId}`)

  return data
}
