import { MessageResponse } from '../../entities/Message'
import { httpClient } from '../httpClient'

export async function getAll() {
  const { data } = await httpClient.get<MessageResponse>('/messages')

  return data
}
