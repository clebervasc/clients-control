import { ComponentProps, forwardRef } from 'react'
import { cn } from '../../app/utils/cn'
import { X } from 'lucide-react'

interface InputProps extends ComponentProps<'input'> {
  name: string
  error?: string
}

export const InputDate = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, name, id, error, className, type, ...props }, ref) => {
    const inputId = id ?? name

    const todayDate = new Date().toISOString().split('T')[0]

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          type={type}
          placeholder=" "
          defaultValue={todayDate}
          max={todayDate}
          className={cn(
            'dark:bg-gray-800 bg-white w-full rounded-lg border dark:border-gray-800 border-gray-500 px-3 h-[48px] dark:text-gray-100 text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:dark:border-gray-800 focus:border-gray-800 transition-all outline-none',
            error && '!border-red-600',
            className,
          )}
        />

        <label
          htmlFor={inputId}
          className="absolute text-xs left-[13px] top-2 pointer-events-none dark:text-gray-200 text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
          {placeholder}
        </label>

        {error && (
          <div className="flex gap-2 items-center mt-2 text-red-600">
            <X />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    )
  },
)

InputDate.displayName = 'InputDate'
