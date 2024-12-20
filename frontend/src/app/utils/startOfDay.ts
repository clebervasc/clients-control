import { startOfDay as start } from 'date-fns'

export const startOfDay = (date: Date | string) =>
  start(new Date(date)).toISOString()
