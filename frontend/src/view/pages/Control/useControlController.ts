import { useDashboardControl } from '../../../app/hooks/useDashboardControl'

export const useControlController = () => {
  const { control, isFetching } = useDashboardControl()

  return { control, isFetching }
}
