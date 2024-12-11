import { useContext } from 'react'
import { ServerContext } from '.'

export function useServer() {
  return useContext(ServerContext)
}
