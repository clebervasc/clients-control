import * as RdxSelect from '@radix-ui/react-select'
import { useState } from 'react'
import { cn } from '../../app/utils/cn'
import { ChevronDownIcon, ChevronUpIcon, X } from 'lucide-react'

interface SelectProps {
  className?: string
  error?: string
  placeholder?: string
  options: {
    value: string
    label: string
  }[]
  value?: string
  onChange?(value: string): void
  disabled?: boolean
}

export function Select({
  className,
  placeholder,
  options,
  error,
  onChange,
  value,
  disabled,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value ?? '')

  function handleSelect(value: string) {
    setSelectedValue(value)
    onChange?.(value)
  }

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            'absolute z-10 top-1/2 -translate-y-1/2 left-3 dark:text-gray-100 text-gray-700 pointer-events-none',
            selectedValue &&
              'text-xs left-[13px] top-2 transition-all translate-y-0',
          )}
        >
          {placeholder}
        </label>

        <RdxSelect.Root
          value={value}
          onValueChange={handleSelect}
          disabled={disabled}
        >
          <RdxSelect.Trigger
            className={cn(
              'dark:bg-gray-800 bg-white w-full rounded-lg border dark:border-gray-800 border-gray-500 px-3 h-[48px] dark:text-gray-100 text-gray-800transition-all outline-none text-left relative pt-4',
              error && '!border-red-900',
              className,
            )}
          >
            <RdxSelect.Value />

            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="w-6 h-6 dark:text-gray-100 text-gray-800" />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>

          <RdxSelect.Portal>
            <RdxSelect.Content className="z-[99] overflow-hidden dark:bg-gray-800 bg-white rounded-2xl border dark:border-gray-800 border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
              <RdxSelect.ScrollUpButton className="flex items-center justify-center h-[25px] dark:bg-gray-800 bg-white dark:text-gray-100 text-gray-800 cursor-default">
                <ChevronUpIcon />
              </RdxSelect.ScrollUpButton>

              <RdxSelect.Viewport className="p-2">
                {options.map((option) => (
                  <RdxSelect.Item
                    key={option.value}
                    value={option.value}
                    className="p-2 dark:text-gray-100 text-gray-800 text-sm data-[state=checked]:font-bold outline-none dark:data-[highlighted]:bg-gray-900  data-[highlighted]:bg-gray-50 rounded-lg transition-colors cursor-pointer hover:dark:bg-gray-900 hover:bg-gray-100"
                  >
                    <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
                  </RdxSelect.Item>
                ))}
              </RdxSelect.Viewport>

              <RdxSelect.ScrollDownButton className="flex items-center justify-center h-[25px] dark:bg-gray-800 bg-white text-gray-800 cursor-default">
                <ChevronDownIcon />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-500">
          <X />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}
