import { Handshake } from 'lucide-react'
import { Button } from './Button'
import { Modal } from './Modal'

interface ConfirmRenewModalProps {
  onConfirm(): void
  onClose(): void
  title: string
  description?: string
  isLoading: boolean
}

export function ConfirmRenewModal({
  onConfirm,
  onClose,
  title,
  description,
  isLoading,
}: ConfirmRenewModalProps) {
  return (
    <Modal open title="Renovar" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[48px] rounded-full bg-red-0 flex items-center justify-center dark:bg-yellow-950">
          <Handshake className="w-6 h-6 text-yellow-600 " />
        </div>

        <p className="w-[180px] dark:text-gray-100 text-gray-800 tracking-[-0.5px] font-bold">
          {title}
        </p>

        {description && (
          <p className="tracking-[-0.5px] dark:text-gray-100 text-gray-800">
            {description}
          </p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <Button
          className="w-full"
          variant="alert"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Sim, desejo renovar
        </Button>

        <Button
          className="w-full"
          variant="ghost"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  )
}
