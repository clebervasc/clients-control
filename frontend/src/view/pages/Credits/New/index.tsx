import { Controller } from 'react-hook-form'
import { Input } from '../../../components/Input'
import { Modal } from '../../../components/Modal'

import { Select } from '../../../components/Select'

import { Button } from '../../../components/Button'

import { useCredit } from '../Components/CreditContext/useCredit'
import { Server } from '../../../../app/entities/Server'
import { useNewCreditController } from './useNewCreditController'
import { InputCurrency } from '../../../components/InputCurrency'
import { InputDate } from '../../../components/InputDate'

interface NewCreditProps {
  servers?: Array<Server>
}

export const NewCredit = ({ servers }: NewCreditProps) => {
  const { isNewCreditModalOpen, closeNewCreditModal } = useCredit()
  const { errors, register, control, handleSubmit, isLoading } =
    useNewCreditController()

  const serversOptions = servers!.map((server: Server) => ({
    value: server.id,
    label: server.name,
  }))

  return (
    <Modal
      title={'Nova Crédito'}
      open={isNewCreditModalOpen}
      onClose={closeNewCreditModal}
    >
      <form
        className="grid gap-4 grid-cols-1"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <Controller
            control={control}
            name="serverId"
            defaultValue={serversOptions[0].value}
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                error={errors?.serverId?.message}
                onChange={onChange}
                value={value}
                options={serversOptions}
              />
            )}
          />
        </div>

        <div>
          <Controller
            control={control}
            name="operation"
            defaultValue="BUY"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Operação"
                error={errors?.operation?.message}
                onChange={onChange}
                value={value}
                options={[
                  {
                    value: 'BUY',
                    label: 'Compra',
                  },
                  {
                    value: 'SELL',
                    label: 'Venda',
                  },
                ]}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <InputDate
            id="date"
            className="font-bold"
            type="date"
            placeholder="Data"
            error={errors?.date?.message}
            {...register('date')}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Input
            id="quantity"
            className="font-bold"
            type="number"
            placeholder="Quantidade"
            error={errors?.quantity?.message}
            defaultValue={1}
            min={1}
            {...register('quantity')}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Controller
            control={control}
            name="amount"
            defaultValue="0,00"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                error={errors.amount?.message}
                onChange={onChange}
                value={value}
                placeholder="Valor"
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
