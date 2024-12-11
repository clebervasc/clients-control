import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMessages } from '../../../app/hooks/useMessages'
import { useMessage } from './components/MessageContext/useMessage'
import { messagesService } from '../../../app/services/messagesService'
import toast from 'react-hot-toast'

export const useMessagesController = () => {
  const { data, isFetching } = useMessages()

  return {
    data,
    isFetching,
  }
}

export const useDeleteMessageController = () => {
  const { messageIdBeingDeleted, closeDeleteMessagetModal } = useMessage()

  const queryClient = useQueryClient()
  const { isLoading: isLoadingDelete, mutateAsync: removeMessage } =
    useMutation(messagesService.remove)

  async function handleDeleteMessage() {
    try {
      await removeMessage(messageIdBeingDeleted!)

      queryClient.invalidateQueries({ queryKey: ['messages'] })
      toast.success('A mensagem foi deletado com sucesso!')
      closeDeleteMessagetModal()
    } catch {
      toast.error('Erro ao deletar a mensagem!')
    }
  }

  return {
    handleDeleteMessage,
    isLoadingDelete,
  }
}
