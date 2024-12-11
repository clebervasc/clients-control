import { CreditsResponse } from '../../entities/Credits'

import { httpClient } from '../httpClient'

export async function getAll() {
  const { data } = await httpClient.get<CreditsResponse>('/credits')

  return data
}
