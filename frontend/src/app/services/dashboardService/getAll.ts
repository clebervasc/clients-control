import { ControlResponse } from '../../entities/Control'
import { httpClient } from '../httpClient'

export async function getAll() {
  const { data } = await httpClient.get<ControlResponse>('/dashboard')

  return data
}
