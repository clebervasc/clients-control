import { MessageType } from '../../entities/Message'
import { httpClient } from '../httpClient'

export interface CreateMessageParams {
  messageId: string
  title: string
  text: string
  messageType: MessageType
}

export async function update({ messageId, ...params }: CreateMessageParams) {
  const { data } = await httpClient.put(`/messages/${messageId}`, params)

  return data
}
