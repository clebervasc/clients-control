import { useContext } from 'react'
import { MessageContext } from '.'

export function useMessage() {
  return useContext(MessageContext)
}
