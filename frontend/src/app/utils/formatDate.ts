export function formatDate(
  date: Date,
  format: 'locale' | 'iso' = 'locale',
  locale = 'pt-BR',
): string {
  if (format === 'iso') {
    const year = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const day = String(date.getUTCDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return Intl.DateTimeFormat(locale, {
    timeZone: 'UTC',
  }).format(date)
}
