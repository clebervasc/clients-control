import { ConfirmDeleteModal } from '../../../components/ConfirmDeleteModal'
import { useDeleteCreditController } from '../useCreditsController'

export const Delete = ({
  closeDeleteCredittModal,
}: {
  closeDeleteCredittModal: () => void
}) => {
  const { handleDeleteCredit, isLoadingDelete } = useDeleteCreditController()

  return (
    <ConfirmDeleteModal
      onClose={closeDeleteCredittModal}
      onConfirm={handleDeleteCredit}
      title="Tem certeza que deseja deletar esse crédito?"
      isLoading={isLoadingDelete}
    />
  )
}
