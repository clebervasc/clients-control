import { ServerResponse } from '../../entities/Server'
import { httpClient } from '../httpClient'

export async function getAll() {
  const { data } = await httpClient.get<ServerResponse>('/servers')

  return data
}
