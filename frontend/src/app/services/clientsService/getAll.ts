import { ClientResponse } from '../../entities/Clients'
import { httpClient } from '../httpClient'

export type ClientsFilters = {
  page: number
  limit: number
  search?: string
  isActive?: null | boolean
}

export async function getAll(filters: ClientsFilters) {
  const { data } = await httpClient.get<ClientResponse>('/clients', {
    params: filters,
  })

  return data
}
