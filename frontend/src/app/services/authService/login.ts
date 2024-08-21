import { httpGoogleClient } from '../httpClient'

export async function login(tokenId: string) {
  const { data } = await httpGoogleClient.post('/auth/google', { tokenId })

  return data
}
