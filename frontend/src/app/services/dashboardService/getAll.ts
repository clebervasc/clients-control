import { httpClient } from '../httpClient'

type ControlResponse = unknown

export async function getAll() {
  const { data } = await httpClient.get<ControlResponse>('/dashboard')

  return data
}
