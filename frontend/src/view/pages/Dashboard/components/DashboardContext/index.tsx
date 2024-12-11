import { createContext, useCallback, useState } from 'react'
import { Client } from '../../../../../app/entities/Clients'
import { localStorageKeys } from '../../../../../app/config/localStorageKeys'

interface DashboardContextValue {
  areValuesVisible: boolean
  toggleValuesVisibility(): void
  clientBeingEdited: null | string
  handleClientBeingEdited(client: Client): void
}

export const DashboardContext = createContext({} as DashboardContextValue)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true)
  const clientBeingEdited = localStorage.getItem(localStorageKeys.CLIENT)

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState)
  }, [])

  const handleClientBeingEdited = (client: Client) => {
    localStorage.setItem(localStorageKeys.CLIENT, JSON.stringify(client))
  }

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,
        clientBeingEdited,
        handleClientBeingEdited,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
