import { Controller } from 'react-hook-form'

import { useNewServerController } from './useNewServerController'
import { InputCurrency } from '../../../components/InputCurrency'
import { ColorsDropdownInput } from '../../../components/ColorsDropdownInput'
import { Modal } from '../../../components/Modal'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

export function NewServer() {
  const {
    isNewServerModalOpen,
    closeNewServerModal,
    handleSubmit,
    errors,
    register,
    control,
    isLoading,
  } = useNewServerController()

  return (
    <Modal
      title={'Novo Servidor'}
      open={isNewServerModalOpen}
      onClose={closeNewServerModal}
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
            Criar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
