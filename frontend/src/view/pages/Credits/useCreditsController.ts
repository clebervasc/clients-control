import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCredits } from '../../../app/hooks/useCredits'
import { useServersControl } from '../../../app/hooks/useServers'
import { useCredit } from './Components/CreditContext/useCredit'
import { creditsService } from '../../../app/services/creditsService'
import toast from 'react-hot-toast'

export const useCreditsController = () => {
  const { data, isFetching } = useCredits()
  const { data: servers, isFetching: isLoadingServers } = useServersControl()

  return {
    data,
    servers,
    isFetching,
    isLoadingServers,
  }
}

export const useDeleteCreditController = () => {
  const { creditIdBeingDeleted, closeDeleteCredittModal } = useCredit()

  const queryClient = useQueryClient()
  const { isLoading: isLoadingDelete, mutateAsync: removeCredit } = useMutation(
    creditsService.remove,
  )

  async function handleDeleteCredit() {
    try {
      await removeCredit(creditIdBeingDeleted!)

      queryClient.invalidateQueries({ queryKey: ['credits'] })
      toast.success('O crédito foi deletado com sucesso!')
      closeDeleteCredittModal()
    } catch {
      toast.error('Erro ao deletar o crédito!')
    }
  }

  return {
    handleDeleteCredit,
    isLoadingDelete,
  }
}
