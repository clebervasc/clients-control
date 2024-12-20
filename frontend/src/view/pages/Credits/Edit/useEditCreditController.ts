import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { useCredit } from '../Components/CreditContext/useCredit'
import { creditsService } from '../../../../app/services/creditsService'
import { currencyStringToNumber } from '../../../../app/utils/currencyStringToNumber'
import { formatDate } from '../../../../app/utils/formatDate'
import { startOfDay } from '../../../../app/utils/startOfDay'

const schema = z.object({
  serverId: z.string().min(1, 'Servidor é obrigatório'),
  date: z
    .union([z.string().min(1, 'Data é obrigatória'), z.date()])
    .refine((value) => typeof value === 'string' || value instanceof Date, {
      message: 'Data deve ser uma string ou um objeto Date',
    }),
  operation: z.enum(['BUY', 'SELL']),
  quantity: z.string().min(1, 'Quantidade é obrigatória'),
  amount: z
    .string()
    .min(2, 'Informe o valor')
    .refine((value) => value !== '0' && value !== '0,00', {
      message: 'Informe o valor',
    }),
})

type FormData = z.infer<typeof schema>

export const useEditCreditController = () => {
  const { closeEditCreditModal, creditBeingEdited } = useCredit()
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      serverId: creditBeingEdited?.server.id,
      operation: creditBeingEdited?.operation,
      date: formatDate(new Date(creditBeingEdited!.date), 'iso'),
      quantity: String(creditBeingEdited?.quantity),
      amount: String(creditBeingEdited?.amount),
    },
  })

  const queryClient = useQueryClient()
  const { isLoading, mutateAsync } = useMutation(creditsService.update)

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        creditId: creditBeingEdited!.id,
        quantity: Number(data.quantity),
        date: startOfDay(data.date),
        amount: currencyStringToNumber(data.amount),
      })

      queryClient.invalidateQueries({ queryKey: ['credits'] })
      toast.success('Crédito foi editado com sucesso!')
      closeEditCreditModal()
      reset()
    } catch {
      toast.error('Erro ao editar o crédito!')
    }
  })

  return {
    errors,
    register,
    control,
    handleSubmit,
    isLoading,
  }
}
