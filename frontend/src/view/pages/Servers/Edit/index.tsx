import { Controller } from 'react-hook-form'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { useEditServerController } from './useEditServerController'
import { InputCurrency } from '../../../components/InputCurrency'
import { ColorsDropdownInput } from '../../../components/ColorsDropdownInput'
import { Modal } from '../../../components/Modal'

export function EditServer() {
  const {
    isEditServerModalOpen,
    closeEditServertModal,
    handleSubmit,
    errors,
    register,
    control,
    isLoading,
  } = useEditServerController()

  return (
    <Modal
      title={'Editar Servidor'}
      open={isEditServerModalOpen}
      onClose={closeEditServertModal}
    >
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 grid-cols-1"
        autoComplete="off"
      >
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome do servidor"
            error={errors.name?.message}
            {...register('name')}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Controller
            control={control}
            name="monthlyPrice"
            defaultValue="0,00"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                error={errors.monthlyPrice?.message}
                onChange={onChange}
                value={value}
                placeholder="Valor mensal"
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Controller
            control={control}
            name="bimonthlyPrice"
            defaultValue="0,00"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                error={errors.bimonthlyPrice?.message}
                onChange={onChange}
                value={value}
                placeholder="Valor bimestral"
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Controller
            control={control}
            name="quarterlyPrice"
            defaultValue="0,00"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                error={errors.quarterlyPrice?.message}
                onChange={onChange}
                value={value}
                placeholder="Valor trimestral"
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Controller
            control={control}
            name="halfYearlyPrice"
            defaultValue="0,00"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                error={errors.halfYearlyPrice?.message}
                onChange={onChange}
                value={value}
                placeholder="Valor semestral"
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Controller
            control={control}
            name="annualPrice"
            defaultValue="0,00"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                error={errors.annualPrice?.message}
                onChange={onChange}
                value={value}
                placeholder="Valor anual"
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
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
