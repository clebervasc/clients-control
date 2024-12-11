import { useServersControl } from '../../../../app/hooks/useServers'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

import { clientsService } from '../../../../app/services/clientsService'
import { getDaysToAdd } from '../../../../app/utils/getDaysToAdd'
import { addDays } from 'date-fns'
import { currencyStringToNumber } from '../../../../app/utils/currencyStringToNumber'
import { useDashboard } from '@/pages/Dashboard/components/DashboardContext/useDashboard'
import { Client } from '../../../../app/entities/Clients'
import { formatDate } from '../../../../app/utils/formatDate'
import { useNavigate } from 'react-router-dom'
import { localStorageKeys } from '../../../../app/config/localStorageKeys'

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório e deve ser preenchido.'),
  login: z
    .string()
    .min(1, 'Login é obrigatório e deve conter um texto válido.'),
  password: z.string().min(1, 'Senha é obrigatório e deve ser preenchido.'),
  mfcId: z.string().min(1, 'Id é obrigatório e deve ser preenchido.'),
  serverId: z
    .string({ required_error: 'Servidor é obrigatório e deve ser preenchido' })
    .min(1, 'Servidor é obrigatório e deve ser preenchido'),
  whatsapp: z.string().min(1, 'WhatsApp é obrigatório e deve ser preenchido.'),
  activeDate: z
    .string()
    .min(1, 'Data de Ativação é obrigatório e deve ser preenchido.'),
  lastPayment: z
    .string()
    .min(1, 'Último Pagamento é obrigatório e deve ser preenchido.'),
  plan: z.enum(['MONTHLY', 'BIMONTHLY', 'QUARTERLY', 'HALF_YEARLY', 'ANNUAL']),
  connections: z
    .string()
    .min(1, 'Conexões é obrigatório e deve ser um número positivo.'),
  paymentMethod: z.enum(['CASH', 'PIX', 'CARD']),
  discount: z.string().nullable(),
  instagram: z.string().nullable(),
  prospection: z
    .enum(['GOOGLE', 'INSTAGRAM', 'YOUTUBE', 'INDICATION', 'OTHER'])
    .optional(),
  email: z
    .string()
    .email('Se preenchido, deve conter um endereço de e-mail válido.')
    .optional()
    .or(z.literal('')),
  document: z.string().nullable(),
  observations: z.string().nullable(),
})

type FormData = z.infer<typeof schema>

export const useEditClientController = () => {
  const navigate = useNavigate()
  const { clientBeingEdited: client } = useDashboard()

  const clientBeingEdited = JSON.parse(client!) as Client

  const { data: servers, isFetching: isLoadingServers } = useServersControl()

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      activeDate: formatDate(new Date(clientBeingEdited!.activeDate), 'iso'),
      connections: String(clientBeingEdited!.connections),
      discount: String(clientBeingEdited!.discount),
      document: clientBeingEdited!.document,
      email: clientBeingEdited!.email!,
      instagram: clientBeingEdited!.instagram,
      lastPayment: formatDate(new Date(clientBeingEdited!.lastPayment), 'iso'),
      login: clientBeingEdited!.login,
      mfcId: clientBeingEdited!.mfcId,
      name: clientBeingEdited!.name,
      observations: clientBeingEdited!.observations,
      password: clientBeingEdited!.password,
      paymentMethod: clientBeingEdited!.paymentMethod,
      plan: clientBeingEdited!.plan,
      prospection: clientBeingEdited!.prospection || undefined,
      serverId: clientBeingEdited!.serverId,
      whatsapp: clientBeingEdited!.whatsapp,
    },
  })

  const queryClient = useQueryClient()
  const { isLoading, mutateAsync } = useMutation(clientsService.update)

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const daysToAdd = getDaysToAdd(data.plan.toLocaleLowerCase())
      const expirationDate = addDays(new Date(data.lastPayment), daysToAdd)
      const newData = {
        ...data,
        id: clientBeingEdited!.id,
        activeDate: new Date(data.activeDate).toISOString(),
        lastPayment: new Date(data.lastPayment).toISOString(),
        expirationDate: new Date(expirationDate).toISOString(),
        isRecurring: false,
        isActive: true,
        discount: currencyStringToNumber(data.discount ?? 0),
        connections: Number(data.connections),
        prospection: data?.prospection ?? null,
        email: data?.email ?? null,
        whatsapp: data?.whatsapp.replace(/\s/g, ''),
      }

      await mutateAsync(newData)

      queryClient.invalidateQueries({ queryKey: ['clients-control'] })
      queryClient.invalidateQueries({ queryKey: ['client-get'] })
      toast.success('Cliente foi editado com sucesso!')

      reset()

      localStorage.removeItem(localStorageKeys.CLIENT)
      navigate('/')
    } catch {
      toast.error('Erro ao editar o cliente!')
    }
  })

  return {
    servers,
    errors,
    register,
    control,
    handleSubmit,
    isLoadingServers,
    isLoading,
  }
}
