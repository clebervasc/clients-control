import * as RadixPopover from '@radix-ui/react-popover'
import { Edit, TrashIcon } from 'lucide-react'
import { useMessage } from './MessageContext/useMessage'
import { Message } from '../../../../app/entities/Message'

interface PopoverProps {
  message: Message
}

export const Popover = ({ message }: PopoverProps) => {
  const { openDeleteMessageModal, openEditMessagetModal } = useMessage()

  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>
        <button className="font-bold text-md outline-none">...</button>
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          side="top"
          className="w-[110px] rounded bg-white p-3 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity]  data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
          sideOffset={5}
        >
          <div className="flex flex-col gap-2.5">
            <button
              className="text-gray-500 flex items-center gap-1"
              onClick={() => openEditMessagetModal(message)}
            >
              <Edit className="w-4" /> Editar
            </button>
            <button
              className="text-red-500 flex items-center gap-1"
              onClick={() => openDeleteMessageModal(message.id)}
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
