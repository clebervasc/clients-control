import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../services/dashboardService'

export function useDashboardControl() {
  const { data, isFetching } = useQuery({
    queryKey: ['dashboard-control'],
    queryFn: dashboardService.getAll,
    staleTime: Infinity,
  })

  return { control: data ?? {}, isFetching }
}
