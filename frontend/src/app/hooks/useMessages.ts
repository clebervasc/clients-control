import { useQuery } from '@tanstack/react-query'
import { messagesService } from '../services/messagesService'

export function useMessages() {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['messages'],
    queryFn: () => messagesService.getAll(),
    staleTime: Infinity,
  })

  return { data, isFetching, refetchMessages: refetch }
}
