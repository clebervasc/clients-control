import { useQuery } from '@tanstack/react-query'
import { creditsService } from '../services/creditsService'

export function useCredits() {
  const { data, isFetching } = useQuery({
    queryKey: ['credits'],
    queryFn: () => creditsService.getAll(),
    staleTime: Infinity,
  })

  return { data, isFetching }
}
