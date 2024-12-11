import { useCallback, useState } from 'react'
import { useServersControl } from '../../../app/hooks/useServers'
import toast from 'react-hot-toast'
import { serversService } from '../../../app/services/serversService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useGetAllServersController = () => {
  const { data, isFetching } = useServersControl()

  return {
    data,
    isFetching,
  }
}

export const useDeleteServerController = () => {
  const [isDeleteServerModalOpen, setIsDeleteServerModalOpen] = useState(false)
  const [serverIdBeingDeleted, setserverIdBeingDeleted] = useState<
    null | string
  >(null)

  const openDeleteServerModalOpen = useCallback((serverId: string) => {
    setserverIdBeingDeleted(serverId)
    setIsDeleteServerModalOpen(true)
  }, [])

  function handleCloseDeleteModal() {
    setIsDeleteServerModalOpen(false)
  }

  const queryClient = useQueryClient()
  const { isLoading: isLoadingDelete, mutateAsync: removeServer } = useMutation(
    serversService.remove,
  )

  async function handleDeleteServer() {
    try {
      await removeServer(serverIdBeingDeleted!)

      queryClient.invalidateQueries({ queryKey: ['servers'] })
      toast.success('O Servidor foi deletado com sucesso!')
      handleCloseDeleteModal()
    } catch {
      toast.error('Erro ao deletar o Servidor!')
    }
  }

  return {
    isDeleteServerModalOpen,
    openDeleteServerModalOpen,
    handleCloseDeleteModal,
    handleDeleteServer,
    isLoadingDelete,
  }
}
