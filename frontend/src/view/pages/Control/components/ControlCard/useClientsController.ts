import { useEffect, useState } from 'react'
import { ClientsFilters } from '../../../../../app/services/clientsService/getAll'
import { useClientsControl } from '../../../../../app/hooks/useClientsControl'

export const useClientsController = () => {
  const [filters, setFilters] = useState<ClientsFilters>({
    page: 1,
    limit: 20,
  })

  const { data, isFetching, refetchClients } = useClientsControl(filters)

  useEffect(() => {
    refetchClients()
  }, [filters, refetchClients])

  function handleChangeFilters<TFilter extends keyof ClientsFilters>(
    filter: TFilter,
  ) {
    return (value: ClientsFilters[TFilter]) => {
      if (value === filters[filter]) return

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }))
    }
  }

  return { data, isFetching, filters, handleChangeFilters }
}
