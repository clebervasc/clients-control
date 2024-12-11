import { createContext, useCallback, useState } from 'react'
import { Message } from '../../../../../app/entities/Message'

interface MessageContextValue {
  isNewMessageModalOpen: boolean
  isEditMessageModalOpen: boolean
  messageBeingEdited: null | Message
  messageIdBeingDeleted: null | string
  isDeleteMessageModalOpen: boolean
  openNewMessageModal(): void
  openEditMessagetModal(message: Message): void
  openDeleteMessageModal(messageId: string): void
  closeNewMessageModal(): void
  closeEditMessagetModal(): void
  closeDeleteMessagetModal(): void
}

export const MessageContext = createContext({} as MessageContextValue)

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false)
  const [isEditMessageModalOpen, setIsEditMessageModalOpen] = useState(false)
  const [messageBeingEdited, setMessageBeingEdited] = useState<null | Message>(
    null,
  )
  const [messageIdBeingDeleted, setMessageIdBeingDeleted] = useState<
    null | string
  >(null)
  const [isDeleteMessageModalOpen, setIsDeleteMessageModalOpen] =
    useState(false)

  const openNewMessageModal = useCallback(() => {
    setIsNewMessageModalOpen(true)
  }, [])

  const openEditMessagetModal = useCallback((message: Message) => {
    setMessageBeingEdited(message)
    setIsEditMessageModalOpen(true)
  }, [])

  const openDeleteMessageModal = useCallback((messageId: string) => {
    setMessageIdBeingDeleted(messageId)
    setIsDeleteMessageModalOpen(true)
  }, [])

  const closeNewMessageModal = useCallback(() => {
    setIsNewMessageModalOpen(false)
  }, [])

  const closeEditMessagetModal = useCallback(() => {
    setMessageBeingEdited(null)
    setIsEditMessageModalOpen(false)
  }, [])

  const closeDeleteMessagetModal = useCallback(() => {
    setMessageIdBeingDeleted(null)
    setIsDeleteMessageModalOpen(false)
  }, [])

  return (
    <MessageContext.Provider
      value={{
        isNewMessageModalOpen,
        isEditMessageModalOpen,
        messageBeingEdited,
        messageIdBeingDeleted,
        isDeleteMessageModalOpen,
        openNewMessageModal,
        openEditMessagetModal,
        openDeleteMessageModal,
        closeNewMessageModal,
        closeEditMessagetModal,
        closeDeleteMessagetModal,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}
