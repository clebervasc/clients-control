import { LaunchScreen } from '@/components/LaunchScreen'
import { useEditClientController } from './useEditClientController'
import { Server } from '../../../../app/entities/Server'
import { Input } from '@/components/Input'
import { Controller } from 'react-hook-form'
import { Select } from '@/components/Select'
import { InputDate } from '@/components/InputDate'
import { InputCurrency } from '@/components/InputCurrency'
import { TextArea } from '@/components/TextArea'
import { Button } from '@/components/Button'

import { whatsappMask } from '../../../../app/utils/whatsappMask'

export const ClientEdit = () => {
  const {
    servers,
    handleSubmit,
    errors,
    register,
    control,
    isLoadingServers,
    isLoading,
  } = useEditClientController()

  if (isLoadingServers) {
    return <LaunchScreen isLoading />
  }

  const serversOptions = servers!.map((server: Server) => ({
    value: server.id,
    label: server.name,
  }))

  return (
    <>
      <>
        <div className="w-full h-full">
          <h1 className="font-bold text-3xl">Editar Cliente</h1>

          <div className="w-full my-4 bg-white shadow-lg rounded-2xl dark:bg-gray-900">
            <form autoComplete="off" onSubmit={handleSubmit} className="p-4">
              <h3 className="font-bold my-4">Dados do cliente</h3>

              <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Nome"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Login"
                    error={errors.login?.message}
                    {...register('login')}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Senha"
                    error={errors.password?.message}
                    {...register('password')}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Id"
                    error={errors.mfcId?.message}
                    {...register('mfcId')}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="WhatsApp"
                    mask={whatsappMask}
                    error={errors.whatsapp?.message}
                    {...register('whatsapp')}
                  />
                </div>
              </div>
              <hr className="my-4" />
              <h3 className="font-bold my-4">Dados do serviço</h3>
              <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                <div className="flex flex-col gap-4">
                  <Controller
                    control={control}
                    name="serverId"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        placeholder="Servidor"
                        error={errors?.serverId?.message}
                        onChange={onChange}
                        value={value}
                        options={serversOptions}
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Controller
                    control={control}
                    name="plan"
                    defaultValue="MONTHLY"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        placeholder="Plano"
                        error={errors?.plan?.message}
                        onChange={onChange}
                        value={value}
                        options={[
                          {
                            label: 'Mensal',
                            value: 'MONTHLY',
                          },
                          {
                            label: 'Bimestral',
                            value: 'BIMONTHLY',
                          },
                          {
                            label: 'Trimestral',
                            value: 'QUARTERLY',
                          },
                          {
                            label: 'Semestral',
                            value: 'HALF_YEARLY',
                          },
                          {
                            label: 'Anual',
                            value: 'ANNUAL',
                          },
                        ]}
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <InputDate
                    className="font-bold"
                    type="date"
                    placeholder="Data de ativação"
                    error={errors?.activeDate?.message}
                    {...register('activeDate')}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <InputDate
                    className="font-bold"
                    type="date"
                    placeholder="Último pagamento"
                    error={errors?.lastPayment?.message}
                    {...register('lastPayment')}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <Input
                    type="number"
                    placeholder="Conexões"
                    defaultValue={1}
                    min={1}
                    error={errors.connections?.message}
                    {...register('connections')}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <Controller
                    control={control}
                    name="paymentMethod"
                    defaultValue="PIX"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        placeholder="Método de pagamento"
                        error={errors?.paymentMethod?.message}
                        onChange={onChange}
                        value={value}
                        options={[
                          {
                            label: 'Pix',
                            value: 'PIX',
                          },
                          {
                            label: 'Cartão',
                            value: 'CARD',
                          },
                          {
                            label: 'Dinheiro',
                            value: 'CASH',
                          },
                        ]}
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <Controller
                    control={control}
                    name="discount"
                    defaultValue="0,00"
                    render={({ field: { onChange, value } }) => (
                      <InputCurrency
                        error={errors.discount?.message}
                        onChange={onChange}
                        value={value || undefined}
                        placeholder="Desconto"
                      />
                    )}
                  />
                </div>
              </div>
              <hr className="my-4" />
              <h3 className="font-bold my-4">Dados do complementares</h3>
              <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                <div className="flex flex-col gap-4">
                  <Controller
                    control={control}
                    name="prospection"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        placeholder="Prospecção"
                        error={errors?.prospection?.message}
                        onChange={onChange}
                        value={value}
                        options={[
                          {
                            label: 'Google',
                            value: 'GOOGLE',
                          },
                          {
                            label: 'Instagram',
                            value: 'INSTAGRAM',
                          },
                          {
                            label: 'YouTube',
                            value: 'YOUTUBE',
                          },
                          {
                            label: 'Indicação',
                            value: 'INDICATION',
                          },
                          {
                            label: 'Outro',
                            value: 'OTHER',
                          },
                        ]}
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Instagram"
                    error={errors.instagram?.message}
                    {...register('instagram')}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="E-mail"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Documento"
                    error={errors.document?.message}
                    {...register('document')}
                  />
                </div>
              </div>
              <hr className="my-4" />
              <h3 className="font-bold my-4">Observações</h3>
              <div className="">
                <TextArea
                  id="text"
                  className="min-h-44"
                  placeholder="Observações"
                  error={errors?.observations?.message}
                  {...register('observations')}
                />
              </div>

              <div className="flex flex-col gap-4 w-full sm:w-[200px] ml-auto">
                <Button type="submit" className="w-full" isLoading={isLoading}>
                  Editar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </>
    </>
  )
}
