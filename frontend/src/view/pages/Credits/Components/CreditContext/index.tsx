import { createContext, useCallback, useState } from 'react'
import { Credit } from '../../../../../app/entities/Credits'

interface CreditContextValue {
  isNewCreditModalOpen: boolean
  isEditCreditModalOpen: boolean
  creditBeingEdited: null | Credit
  creditIdBeingDeleted: null | string
  isDeleteCreditModalOpen: boolean
  openNewCreditModal(): void
  openEditCredittModal(credit: Credit): void
  openDeleteCreditModal(creditId: string): void
  closeNewCreditModal(): void
  closeEditCreditModal(): void
  closeDeleteCredittModal(): void
}

export const CreditContext = createContext({} as CreditContextValue)

export function CreditProvider({ children }: { children: React.ReactNode }) {
  const [isNewCreditModalOpen, setIsNewCreditModalOpen] = useState(false)
  const [isEditCreditModalOpen, setIsEditCreditModalOpen] = useState(false)
  const [creditBeingEdited, setCreditBeingEdited] = useState<null | Credit>(
    null,
  )
  const [creditIdBeingDeleted, setCreditIdBeingDeleted] = useState<
    null | string
  >(null)
  const [isDeleteCreditModalOpen, setIsDeleteCreditModalOpen] = useState(false)

  const openNewCreditModal = useCallback(() => {
    setIsNewCreditModalOpen(true)
  }, [])

  const openEditCredittModal = useCallback((credit: Credit) => {
    setCreditBeingEdited(credit)
    setIsEditCreditModalOpen(true)
  }, [])

  const openDeleteCreditModal = useCallback((creditId: string) => {
    setCreditIdBeingDeleted(creditId)
    setIsDeleteCreditModalOpen(true)
  }, [])

  const closeNewCreditModal = useCallback(() => {
    setIsNewCreditModalOpen(false)
  }, [])

  const closeEditCreditModal = useCallback(() => {
    setCreditBeingEdited(null)
    setIsEditCreditModalOpen(false)
  }, [])

  const closeDeleteCredittModal = useCallback(() => {
    setCreditIdBeingDeleted(null)
    setIsDeleteCreditModalOpen(false)
  }, [])

  return (
    <CreditContext.Provider
      value={{
        isNewCreditModalOpen,
        isEditCreditModalOpen,
        creditBeingEdited,
        creditIdBeingDeleted,
        isDeleteCreditModalOpen,
        openNewCreditModal,
        openEditCredittModal,
        openDeleteCreditModal,
        closeNewCreditModal,
        closeEditCreditModal,
        closeDeleteCredittModal,
      }}
    >
      {children}
    </CreditContext.Provider>
  )
}
