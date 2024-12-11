import { useQuery } from '@tanstack/react-query'
import { clientsService } from '../services/clientsService'

export function useGetClient(clientId: string) {
  const { data, isFetching } = useQuery({
    queryKey: ['client-get'],
    queryFn: () => clientsService.getById(clientId),
    staleTime: Infinity,
  })

  return { data, isFetching }
}
