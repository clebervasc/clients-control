import { createContext } from 'react'

export const DashboardContext = createContext({})

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  return (
    <DashboardContext.Provider value={{}}>{children}</DashboardContext.Provider>
  )
}
