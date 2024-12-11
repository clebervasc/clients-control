import { useQuery } from '@tanstack/react-query'
import { clientsService } from '../services/clientsService'
import { ClientsFilters } from '../services/clientsService/getAll'

export function useClientsControl(filters: ClientsFilters) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['clients-control'],
    queryFn: () => clientsService.getAll(filters),
    staleTime: Infinity,
  })

  return { data, isFetching, refetchClients: refetch }
}
