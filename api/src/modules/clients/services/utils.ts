export const getDaysToAdd = (plan: string): number => {
  switch (plan) {
    case 'monthly':
      return 29
    case 'bimonthly':
      return 59
    case 'quarterly':
      return 89
    case 'halfY_early':
      return 179
    case 'annual':
      return 364
    default:
      throw new Error('Invalid plan type')
  }
}
