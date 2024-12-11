export type MessageType =
  | 'BEFORE_EXPIRATION'
  | 'EXPIRATION'
  | 'AFTER_EXPIRATION'

export enum MessageStatus {
  BEFORE_EXPIRATION = 'BEFORE_EXPIRATION',
  EXPIRATION = 'EXPIRATION',
  AFTER_EXPIRATION = 'AFTER_EXPIRATION',
}

export const MessageStatusTranslation: Record<MessageStatus, string> = {
  [MessageStatus.BEFORE_EXPIRATION]: 'EM DIA',
  [MessageStatus.EXPIRATION]: 'HOJE',
  [MessageStatus.AFTER_EXPIRATION]: 'VENCIDO',
}

export const MessageTypeTranslation: Record<MessageStatus, string> = {
  [MessageStatus.BEFORE_EXPIRATION]: 'Antes do Vencimento',
  [MessageStatus.EXPIRATION]: 'Vence hoje',
  [MessageStatus.AFTER_EXPIRATION]: 'Após Vencimento',
}

export interface Message {
  id: string
  userId: string
  title: string
  text: string
  messageType: MessageType
}

export type MessageResponse = Array<Message>
