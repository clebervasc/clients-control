import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

import { currencyStringToNumber } from '../../../../app/utils/currencyStringToNumber'
import { serversService } from '../../../../app/services/serversService'
import { useServer } from '../components/ServerContext/useServer'

const schema = z.object({
  name: z.string().min(1, 'Informe o nome do servidor'),
  monthlyPrice: z
    .string()
    .min(2, 'Informe o valor mensal')
    .refine((value) => value !== '0' && value !== '0,00', {
      message: 'Informe o valor mensal',
    }),
  bimonthlyPrice: z
    .string()
    .min(2, 'Informe o valor bimestral')
    .refine((value) => value !== '0' && value !== '0,00', {
      message: 'Informe o valor mensal',
    }),
  quarterlyPrice: z
    .string()
    .min(2, 'Informe o valor trimestral')
    .refine((value) => value !== '0' && value !== '0,00', {
      message: 'Informe o valor mensal',
    }),
  halfYearlyPrice: z
    .string()
    .min(2, 'Informe o valor semestral')
    .refine((value) => value !== '0' && value !== '0,00', {
      message: 'Informe o valor mensal',
    }),
  annualPrice: z
    .string()
    .min(2, 'Informe o valor anual')
    .refine((value) => value !== '0' && value !== '0,00', {
      message: 'Informe o valor mensal',
    }),
  color: z.string().min(1, 'Cor é obrigatória'),
})

type FormData = z.infer<typeof schema>

export function useEditServerController() {
  const { isEditServerModalOpen, closeEditServertModal, serverBeingEdited } =
    useServer()

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: serverBeingEdited?.name,
      monthlyPrice: String(serverBeingEdited?.monthlyPrice),
      bimonthlyPrice: String(serverBeingEdited?.bimonthlyPrice),
      quarterlyPrice: String(serverBeingEdited?.quarterlyPrice),
      halfYearlyPrice: String(serverBeingEdited?.halfYearlyPrice),
      annualPrice: String(serverBeingEdited?.annualPrice),
      color: serverBeingEdited?.color,
    },
  })

  const queryClient = useQueryClient()
  const { isLoading, mutateAsync } = useMutation(serversService.update)

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        serverId: serverBeingEdited!.id,
        monthlyPrice: currencyStringToNumber(data.monthlyPrice),
        bimonthlyPrice: currencyStringToNumber(data.bimonthlyPrice),
        quarterlyPrice: currencyStringToNumber(data.quarterlyPrice),
        halfYearlyPrice: currencyStringToNumber(data.halfYearlyPrice),
        annualPrice: currencyStringToNumber(data.annualPrice),
      })
      queryClient.invalidateQueries({ queryKey: ['servers'] })
      toast.success('Sucesso ao editar o servidor!')

      reset()
      closeEditServertModal()
    } catch {
      toast.error('Erro ao editar o servidor!')
    }
  })

  return {
    isEditServerModalOpen,
    closeEditServertModal,
    register,
    errors,
    control,
    handleSubmit,
    isLoading,
  }
}
