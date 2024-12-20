import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

import { useServersControl } from '../../../../app/hooks/useServers'
import { clientsService } from '../../../../app/services/clientsService'
import { getDaysToAdd } from '../../../../app/utils/getDaysToAdd'
import { addDays } from 'date-fns'
import { currencyStringToNumber } from '../../../../app/utils/currencyStringToNumber'
import { useNavigate } from 'react-router-dom'
import { startOfDay } from '../../../../app/utils/startOfDay'

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

export const useNewClientController = () => {
  const navigate = useNavigate()
  const { data: servers, isFetching: isLoadingServers } = useServersControl()

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const queryClient = useQueryClient()
  const { isLoading, mutateAsync } = useMutation(clientsService.create)

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const daysToAdd = getDaysToAdd(data.plan.toLocaleLowerCase())
      const expirationDate = addDays(new Date(data.lastPayment), daysToAdd)

      const newData = {
        ...data,
        activeDate: startOfDay(data.activeDate),
        lastPayment: startOfDay(data.lastPayment),
        expirationDate: startOfDay(expirationDate),
        isRecurring: false,
        isActive: true,
        discount: currencyStringToNumber(data.discount ?? 0),
        connections: Number(data.connections),
        prospection: data?.prospection ?? null,
        email: data?.email ?? null,
        whatsapp: data?.whatsapp.replace(/\s/g, ''),
      }

      await mutateAsync(newData)

      queryClient.invalidateQueries({ queryKey: ['dashboard-control'] })
      queryClient.invalidateQueries({ queryKey: ['clients-control'] })
      queryClient.invalidateQueries({ queryKey: ['client-get'] })
      toast.success('Cliente foi cadastrado com sucesso!')

      reset()
      navigate('/')
    } catch {
      toast.error('Erro ao cadastrar o cliente!')
    }
  })

  return {
    servers,
    isLoadingServers,
    errors,
    register,
    control,
    handleSubmit,
    isLoading,
  }
}
