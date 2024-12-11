import { createContext, useCallback, useState } from 'react'
import { Server } from '../../../../../app/entities/Server'

interface ServerContextValue {
  isNewServerModalOpen: boolean
  openNewServerModal(): void
  closeNewServerModal(): void
  isEditServerModalOpen: boolean
  serverBeingEdited: null | Server
  openEditServertModal(server: Server): void
  closeEditServertModal(): void
}

export const ServerContext = createContext({} as ServerContextValue)

export function ServerProvider({ children }: { children: React.ReactNode }) {
  const [isNewServerModalOpen, setIsNewServerModalOpen] = useState(false)

  const openNewServerModal = useCallback(() => {
    setIsNewServerModalOpen(true)
  }, [])

  const closeNewServerModal = useCallback(() => {
    setIsNewServerModalOpen(false)
  }, [])

  const [isEditServerModalOpen, setIsEditServerModalOpen] = useState(false)
  const [serverBeingEdited, setServerBeingEdited] = useState<null | Server>(
    null,
  )

  const openEditServertModal = useCallback((server: Server) => {
    setServerBeingEdited(server)
    setIsEditServerModalOpen(true)
  }, [])

  const closeEditServertModal = useCallback(() => {
    setServerBeingEdited(null)
    setIsEditServerModalOpen(false)
  }, [])

  return (
    <ServerContext.Provider
      value={{
        isNewServerModalOpen,
        openNewServerModal,
        closeNewServerModal,
        isEditServerModalOpen,
        serverBeingEdited,
        openEditServertModal,
        closeEditServertModal,
      }}
    >
      {children}
    </ServerContext.Provider>
  )
}
