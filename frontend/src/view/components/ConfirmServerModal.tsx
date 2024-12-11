import { SquareTerminal } from 'lucide-react'
import { Button } from './Button'
import { Modal } from './Modal'
import { useNavigate } from 'react-router-dom'

interface ConfirmServerModalProps {
  description: string
}

export function ConfirmServerModal({ description }: ConfirmServerModalProps) {
  const navigate = useNavigate()

  const goToServers = () => navigate('/servidores')
  const goToHome = () => navigate('/')
  return (
    <Modal open title="Ops!" onClose={goToHome}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[48px] rounded-full bg-red-0 flex items-center justify-center dark:bg-blue-950">
          <SquareTerminal className="w-6 h-6 text-blue-600 " />
        </div>

        <p className="w-[180px] dark:text-gray-100 text-gray-800 tracking-[-0.5px] font-bold">
          Parece que você não tem servidores cadastrados.
        </p>

        {description && (
          <p className="tracking-[-0.5px] dark:text-gray-100 text-gray-800">
            {description}
          </p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <Button className="w-full" onClick={goToServers}>
          Sim, desejo cadastrar
        </Button>

        <Button className="w-full" variant="ghost" onClick={goToHome}>
          Cancelar
        </Button>
      </div>
    </Modal>
  )
}
