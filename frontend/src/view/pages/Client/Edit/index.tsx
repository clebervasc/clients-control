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
import { useGetClientController } from '../useClientController'

import { formatDate } from '../../../../app/utils/formatDate'

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

  const { data } = useGetClientController()

  if (!data || isLoadingServers) {
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
                    defaultValue={data?.name}
                    {...register('name')}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Login"
                    error={errors.login?.message}
                    defaultValue={data?.login}
                    {...register('login')}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Senha"
                    error={errors.password?.message}
                    defaultValue={data?.password}
                    {...register('password')}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Id"
                    error={errors.mfcId?.message}
                    defaultValue={data?.mfcId}
                    {...register('mfcId')}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="WhatsApp"
                    mask={whatsappMask}
                    error={errors.whatsapp?.message}
                    defaultValue={data?.whatsapp}
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
                    defaultValue={data?.serverId}
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
                    defaultValue={data?.plan}
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
                    defaultValue={formatDate(new Date(data.activeDate), 'iso')}
                    error={errors?.activeDate?.message}
                    {...register('activeDate')}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <InputDate
                    className="font-bold"
                    type="date"
                    placeholder="Último pagamento"
                    defaultValue={formatDate(new Date(data.lastPayment), 'iso')}
                    error={errors?.lastPayment?.message}
                    {...register('lastPayment')}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <Input
                    type="number"
                    placeholder="Conexões"
                    min={1}
                    defaultValue={data?.connections}
                    error={errors.connections?.message}
                    {...register('connections')}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <Controller
                    control={control}
                    name="paymentMethod"
                    defaultValue={data?.paymentMethod}
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
                    defaultValue={String(data?.discount)}
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
                    defaultValue={data?.prospection || undefined}
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
                    defaultValue={data?.instagram || undefined}
                    error={errors.instagram?.message}
                    {...register('instagram')}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="E-mail"
                    defaultValue={data?.email || undefined}
                    error={errors.email?.message}
                    {...register('email')}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Documento"
                    defaultValue={data?.document || undefined}
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
                  defaultValue={data?.observations || undefined}
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
