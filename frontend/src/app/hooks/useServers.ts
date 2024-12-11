import { useQuery } from '@tanstack/react-query'
import { serversService } from '../services/serversService'

export function useServersControl() {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['servers'],
    queryFn: () => serversService.getAll(),
    staleTime: Infinity,
  })

  return { data, isFetching, refetchServers: refetch }
}
