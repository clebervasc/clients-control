import { ConfirmDeleteModal } from '../../../components/ConfirmDeleteModal'
import { useDeleteMessageController } from '../useMessagesController'

export const Delete = ({
  closeDeleteMessagetModal,
}: {
  closeDeleteMessagetModal: () => void
}) => {
  const { handleDeleteMessage, isLoadingDelete } = useDeleteMessageController()

  return (
    <ConfirmDeleteModal
      onClose={closeDeleteMessagetModal}
      onConfirm={handleDeleteMessage}
      title="Tem certeza que deseja deletar essa mensagem?"
      isLoading={isLoadingDelete}
    />
  )
}
