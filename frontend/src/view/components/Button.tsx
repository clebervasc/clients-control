import { ComponentProps } from 'react'
import { cn } from '../../app/utils/cn'
import { Spinner } from './Spinner'

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean
  variant?: 'danger' | 'ghost' | 'alert'
}

export function Button({
  className,
  isLoading,
  disabled,
  children,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 px-6 h-12 rounded-2xl font-medium text-white transition-all flex items-center justify-center',
        variant === 'danger' && 'bg-red-600 hover:bg-red-700',
        variant === 'alert' && 'bg-yellow-600 hover:bg-yellow-700',
        variant === 'ghost' &&
          'bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800/5 dark:border-gray-100 dark:text-gray-100 hover:dark:border-gray-100/50',
        className,
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="w-6 h-6" />}
    </button>
  )
}
