import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { messagesService } from '../../../../app/services/messagesService'
import { useMessage } from '../components/MessageContext/useMessage'

const schema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  text: z.string().min(1, 'Mensagem é obrigatória'),
  messageType: z.enum(['BEFORE_EXPIRATION', 'EXPIRATION', 'AFTER_EXPIRATION']),
})

type FormData = z.infer<typeof schema>

export const useNewMessageController = () => {
  const { closeNewMessageModal } = useMessage()
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
  const { isLoading, mutateAsync } = useMutation(messagesService.create)

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync(data)

      queryClient.invalidateQueries({ queryKey: ['messages'] })
      toast.success('Mensagem foi cadastrada com sucesso!')
      closeNewMessageModal()
      reset()
    } catch {
      toast.error('Você não pode cadastrar um tipo de mensagem já cadastrado')
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
