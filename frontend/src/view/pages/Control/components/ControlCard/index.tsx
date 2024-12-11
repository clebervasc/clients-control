import { ReactNode } from 'react'
import { cn } from '../../../../../app/utils/cn'

import { useDashboard } from '../../../Dashboard/components/DashboardContext/useDashboard'

export const ControlCard = ({
  title,
  value,
  color,
  icon,
}: {
  title: string
  value: number
  color?: string
  icon: ReactNode
}) => {
  const { areValuesVisible } = useDashboard()

  return (
    <div className="w-1/6 p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-900">
      <div className="flex items-center">
        <span className={cn('relative p-2 bg-purple-200 rounded-xl', color)}>
          {icon}
        </span>
        <p className="ml-2 text-black text-md dark:text-white">{title}</p>
      </div>
      <div className="flex flex-col justify-start">
        <p
          className={cn(
            'my-4 text-4xl font-bold text-left text-gray-700 dark:text-gray-100',
            !areValuesVisible && 'blur-md',
          )}
        >
          {value}
        </p>
      </div>
    </div>
  )
}
