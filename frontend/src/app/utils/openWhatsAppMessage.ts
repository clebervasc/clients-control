interface OpenWhatsAppMessageProps {
  phoneNumber: number | string
  title?: string
  message?: string
}

export function openWhatsAppMessage({
  phoneNumber,
  title,
  message,
}: OpenWhatsAppMessageProps) {
  const phoneNumberFormatted = String(phoneNumber).replace(/\W/gm, '')
  const formattedMessage = `*${title}*\n\n${message}`
  const encodedMessage = encodeURIComponent(formattedMessage)
  const whatsappLink = `https://wa.me/+55${phoneNumberFormatted}?text=${encodedMessage}`

  window.open(whatsappLink, '_blank')
}
