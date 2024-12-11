import * as RdxDialog from '@radix-ui/react-dialog'
import { cn } from '../../app/utils/cn'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  children: React.ReactNode
  title: string
  rightAction?: React.ReactNode
  onClose?(): void
}

export function Modal({
  open,
  title,
  onClose,
  rightAction,
  children,
}: ModalProps) {
  return (
    <RdxDialog.Root open={open} onOpenChange={onClose}>
      <RdxDialog.Portal>
        <RdxDialog.Overlay
          className={cn(
            'fixed inset-0 bg-black/80 backdrop-blur-sm z-50',
            'data-[state=open]:animate-overlay-show',
          )}
        />

        <RdxDialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 dark:bg-neutral-950 bg-white rounded-2xl z-[51] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[400px] outline-none',
            'data-[state=open]:animate-content-show',
          )}
          onEscapeKeyDown={(event) => {
            event.preventDefault()
          }}
          onPointerDownOutside={(event) => {
            event.preventDefault()
          }}
        >
          <header className="h-12 flex items-center justify-between text-gray-800 dark:text-gray-100">
            <button
              className="w-12 h-12 flex items-center justify-center outline-none"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </button>

            <span className="text-lg tracking-[-1px] font-bold dark:text-gray-100">
              {title}
            </span>

            <div className="w-12 h-12 flex items-center justify-center dark:text-gray-100">
              {rightAction}
            </div>
          </header>

          <div>{children}</div>
        </RdxDialog.Content>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  )
}
