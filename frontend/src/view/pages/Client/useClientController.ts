import { useParams } from 'react-router-dom'
import { useGetClient } from '../../../app/hooks/useClient'

export const useGetClientController = () => {
  const { clientId } = useParams()

  const { data, isFetching } = useGetClient(clientId as string)

  return { data, isFetching }
}
