import { useCallback, useState } from 'react'
import { useDashboardControl } from '../../../app/hooks/useDashboardControl'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { clientsService } from '../../../app/services/clientsService'
import { toast } from 'react-hot-toast'
import { RenewClientParams } from '../../../app/services/clientsService/renew'
import { useMessagesController } from '../Messages/useMessagesController'

export const useControlController = () => {
  const { data: messages } = useMessagesController()
  const { data, isFetching } = useDashboardControl()

  return { data, messages, isFetching }
}

export const useDeleteClientController = () => {
  const [isDeleteClientModalOpen, setIsDeleteClientModalOpen] = useState(false)
  const [clientIdBeingDeleted, setclientIdBeingDeleted] = useState<
    null | string
  >(null)

  const openDeleteClientModalOpen = useCallback((clientId: string) => {
    setclientIdBeingDeleted(clientId)
    setIsDeleteClientModalOpen(true)
  }, [])

  function handleCloseDeleteModal() {
    setIsDeleteClientModalOpen(false)
  }

  const queryClient = useQueryClient()
  const { isLoading: isLoadingDelete, mutateAsync: removeClient } = useMutation(
    clientsService.remove,
  )

  async function handleDeleteClient() {
    try {
      await removeClient(clientIdBeingDeleted!)

      queryClient.invalidateQueries({ queryKey: ['dashboard-control'] })
      queryClient.invalidateQueries({ queryKey: ['clients-control'] })
      toast.success('O Cliente foi deletado com sucesso!')
      handleCloseDeleteModal()
    } catch {
      toast.error('Erro ao deletar o Cliente!')
    }
  }

  return {
    isDeleteClientModalOpen,
    openDeleteClientModalOpen,
    handleCloseDeleteModal,
    handleDeleteClient,
    isLoadingDelete,
  }
}

export const useRenewClientController = () => {
  const [isRenewClientModalOpen, setIsRenewClientModalOpen] = useState(false)
  const [clientIdBeingRenewed, setclientIdBeingRenewed] =
    useState<null | RenewClientParams>(null)

  const openRenewClientModalOpen = useCallback((client: RenewClientParams) => {
    setclientIdBeingRenewed(client)
    setIsRenewClientModalOpen(true)
  }, [])

  function handleCloseRenewModal() {
    setIsRenewClientModalOpen(false)
  }

  const queryClient = useQueryClient()
  const { isLoading: isLoadingRenew, mutateAsync: renewClient } = useMutation(
    clientsService.renew,
  )

  async function handleRenewClient() {
    try {
      await renewClient(clientIdBeingRenewed!)

      queryClient.invalidateQueries({ queryKey: ['dashboard-control'] })
      queryClient.invalidateQueries({ queryKey: ['clients-control'] })
      toast.success('O Cliente foi renovado com sucesso!')
      handleCloseRenewModal()
    } catch {
      toast.error('Erro ao renovar o Cliente!')
    }
  }

  return {
    isRenewClientModalOpen,
    openRenewClientModalOpen,
    handleCloseRenewModal,
    handleRenewClient,
    isLoadingRenew,
  }
}
