import { useState } from 'react'
import { useClientsController } from '../ControlCard/useClientsController'

export const useSearchController = () => {
  const { handleChangeFilters } = useClientsController()
  const [login, setLogin] = useState('')
  const [status, setStatus] = useState('Todos')

  const handleLogin = (value: string) => {
    setLogin(value)
  }

  const handleStatus = (value: string) => {
    setStatus(value)
  }

  const handleLoginSearch = () => {
    handleChangeFilters('login')(login)
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
    setLogin('')
    setStatus('Todos')
    handleChangeFilters('login')('')
    handleChangeFilters('isActive')(null)
  }

  return {
    login,
    status,
    handleLogin,
    handleStatusSearch,
    handleStatus,
    handleLoginSearch,
    resetFilters,
  }
}
