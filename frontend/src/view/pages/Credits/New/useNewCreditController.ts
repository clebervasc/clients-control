import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { useCredit } from '../Components/CreditContext/useCredit'
import { creditsService } from '../../../../app/services/creditsService'
import { currencyStringToNumber } from '../../../../app/utils/currencyStringToNumber'

const schema = z.object({
  serverId: z.string().min(1, 'Servidor é obrigatório'),
  date: z.string().min(1, 'Data é obrigatória'),
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

export const useNewCreditController = () => {
  const { closeNewCreditModal } = useCredit()
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
  const { isLoading, mutateAsync } = useMutation(creditsService.create)

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        quantity: Number(data.quantity),
        date: new Date(data.date).toISOString(),
        amount: currencyStringToNumber(data.amount),
      })

      queryClient.invalidateQueries({ queryKey: ['credits'] })
      toast.success('Crédito foi cadastrado com sucesso!')
      closeNewCreditModal()
      reset()
    } catch {
      toast.error('Erro ao cadastrar o crédito!')
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
