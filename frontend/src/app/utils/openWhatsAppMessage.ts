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
  const formattedMessage = `*${title}*\n\n${message}`
  const encodedMessage = encodeURIComponent(formattedMessage)
  const whatsappLink = `https://wa.me/+55${phoneNumber}?text=${encodedMessage}`

  window.open(whatsappLink, '_blank')
}
