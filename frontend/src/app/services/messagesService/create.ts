import { MessageType } from '../../entities/Message'
import { httpClient } from '../httpClient'

export interface CreateMessageParams {
  title: string
  text: string
  messageType: MessageType
}

export async function create(params: CreateMessageParams) {
  const { data } = await httpClient.post('/messages', params)

  return data
}
