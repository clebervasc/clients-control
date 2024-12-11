import { differenceInCalendarDays } from 'date-fns'
import { cn } from './cn'

export const expirationDate = (expirationDateString: string) => {
  const today = new Date()
  const utcToday = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  )
  const targetDate = new Date(expirationDateString)
  const differenceInDays = differenceInCalendarDays(targetDate, utcToday)

  return cn(
    'inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white',
    differenceInDays < 0 &&
      'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500',
    differenceInDays === 0 &&
      'bg-orange-100 text-orange-800 dark:bg-orange-800/30 dark:text-orange-500',
    differenceInDays > 0 &&
      differenceInDays < 3 &&
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500',
  )
}
