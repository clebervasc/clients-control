export function formatCurrency(value: number) {
  const currency = Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)

  return isNaN(value) ? '-' : currency
}
