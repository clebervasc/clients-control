import * as RadixPopover from '@radix-ui/react-popover'
import { useNavigate } from 'react-router-dom'
import { RenewClientParams } from '../../../../../app/services/clientsService/renew'
import { Client } from '../../../../../app/entities/Clients'
import { PlanLowerEnum } from '../../../../../app/entities/Plan'
import { Edit, Eye, Handshake, TrashIcon } from 'lucide-react'
import { useDashboard } from '@/pages/Dashboard/components/DashboardContext/useDashboard'

interface PopoverProps {
  client: Client
  openDeleteClientModalOpen: (clientId: string) => void
  openRenewClientModalOpen: (client: RenewClientParams) => void
}

export const Popover = ({
  client,
  openDeleteClientModalOpen,
  openRenewClientModalOpen,
}: PopoverProps) => {
  const { handleClientBeingEdited } = useDashboard()
  const navigate = useNavigate()

  const handleClientView = () => {
    navigate(`/clientes/detalhes/${client.id}`)
  }

  const handleClientEdit = () => {
    handleClientBeingEdited(client)
    navigate(`/clientes/editar/${client.id}`)
  }

  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>
        <button className="font-bold text-md outline-none">...</button>
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          side="top"
          className="w-[110px] rounded dark:bg-gray-800 bg-white p-3 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity]  data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
          sideOffset={5}
        >
          <div className="flex flex-col gap-2.5">
            <button
              className="text-blue-500 flex items-center gap-1"
              onClick={handleClientView}
            >
              <Eye className="w-4" /> Ver
            </button>
            <button
              className="text-gray-500 flex items-center gap-1 dark:text-gray-200"
              onClick={handleClientEdit}
            >
              <Edit className="w-4" /> Editar
            </button>
            <button
              className="text-yellow-500 flex items-center gap-1"
              onClick={() =>
                openRenewClientModalOpen({
                  clientId: client.id,
                  plan: PlanLowerEnum[client.plan],
                })
              }
            >
              <Handshake className="w-4" /> Renovar
            </button>
            <button
              className="text-red-500 flex items-center gap-1"
              onClick={() => openDeleteClientModalOpen(client.id)}
            >
              <TrashIcon className="w-4" /> Deletar
            </button>
          </div>
          <RadixPopover.Arrow className="fill-white" />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}
