import { useState } from 'react'
import { useClientsController } from '../ControlCard/useClientsController'

export const useSearchController = () => {
  const { handleChangeFilters } = useClientsController()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Todos')

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const handleStatus = (value: string) => {
    setStatus(value)
  }

  const handleSearchSearch = () => {
    handleChangeFilters('search')(search)
  }

  const handleStatusSearch = () => {
    const clientStatus = status.toLowerCase()
    switch (true) {
      case clientStatus === 'ativado':
        return handleChangeFilters('isActive')(true)
      case clientStatus === 'inativado':
        return handleChangeFilters('isActive')(false)
      default:
        return handleChangeFilters('isActive')(null)
    }
  }

  const resetFilters = () => {
    setSearch('')
    setStatus('Todos')
    handleChangeFilters('search')('')
    handleChangeFilters('isActive')(null)
  }

  return {
    search,
    status,
    handleSearch,
    handleStatusSearch,
    handleStatus,
    handleSearchSearch,
    resetFilters,
  }
}
