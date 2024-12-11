import { useContext } from 'react'
import { CreditContext } from '.'

export function useCredit() {
  return useContext(CreditContext)
}
