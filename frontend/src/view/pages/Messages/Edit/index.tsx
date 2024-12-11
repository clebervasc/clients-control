import { Controller } from 'react-hook-form'
import { Input } from '../../../components/Input'
import { Modal } from '../../../components/Modal'
import { useMessage } from '../components/MessageContext/useMessage'
import { Select } from '../../../components/Select'

import { Button } from '../../../components/Button'
import { useEditMessageController } from './useEditMessageController'
import { TextArea } from '../../../components/TextArea'

export const EditMessage = () => {
  const { isEditMessageModalOpen, closeEditMessagetModal } = useMessage()
  const { handleSubmit, control, errors, register, isLoading } =
    useEditMessageController()

  return (
    <Modal
      title={'Editar Mensagem'}
      open={isEditMessageModalOpen}
      onClose={closeEditMessagetModal}
    >
      <form
        className="grid gap-4 grid-cols-1"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <Input
            id="title"
            className="font-bold"
            type="text"
            placeholder="Título"
            error={errors?.title?.message}
            {...register('title')}
          />
        </div>

        <div className="flex flex-col gap-4">
          <TextArea
            id="text"
            className="min-h-44"
            placeholder="Digite sua mensagem"
            error={errors?.text?.message}
            {...register('text')}
          />
        </div>

        <div>
          <Controller
            control={control}
            name="messageType"
            defaultValue="BEFORE_EXPIRATION"
            render={({ field: { onChange, value } }) => (
              <Select
                className="cursor-not-allowed bg-gray-200"
                placeholder="Tipo"
                error={errors?.messageType?.message}
                onChange={onChange}
                value={value}
                options={[
                  {
                    value: 'BEFORE_EXPIRATION',
                    label: 'Antes do vencimento',
                  },
                  {
                    value: 'EXPIRATION',
                    label: 'Vence hoje',
                  },
                  {
                    value: 'AFTER_EXPIRATION',
                    label: 'Após Vencimento',
                  },
                ]}
                disabled
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Editar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
