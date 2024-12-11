import { MessageStatus, MessageStatusTranslation } from '../entities/Message'

export function checkValidityDate(dateString: string): {
  status: MessageStatus
  translation: string
} {
  const expirationDate = new Date(dateString)
  const today = new Date()
  const utcToday = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  )

  const oneDayInMs = 24 * 60 * 60 * 1000
  const differenceInDays = Math.floor(
    (expirationDate.getTime() - utcToday.getTime()) / oneDayInMs,
  )

  const customTranslations: Record<number, string> = {
    1: 'AMANHÃ',
    2: '2 DIAS',
  }

  if (differenceInDays < 0) {
    return {
      status: MessageStatus.AFTER_EXPIRATION,
      translation: MessageStatusTranslation[MessageStatus.AFTER_EXPIRATION],
    }
  }

  if (differenceInDays === 0) {
    return {
      status: MessageStatus.EXPIRATION,
      translation: MessageStatusTranslation[MessageStatus.EXPIRATION],
    }
  }

  return {
    status: MessageStatus.BEFORE_EXPIRATION,
    translation:
      customTranslations[differenceInDays] ||
      MessageStatusTranslation[MessageStatus.BEFORE_EXPIRATION],
  }
}
