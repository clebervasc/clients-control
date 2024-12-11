import { Server } from './Server'

export type CreditOperationType = 'BUY' | 'SELL'

export enum CreditOperation {
  BUY = 'BUY',
  SELL = 'SELL',
}

export const CreditOperationTranslation: Record<CreditOperation, string> = {
  [CreditOperation.BUY]: 'Compra',
  [CreditOperation.SELL]: 'Venda',
}

export type Credit = {
  id: string
  date: string
  operation: CreditOperationType
  quantity: number
  amount: number
  server: Server
}

export type CreditsResponse = Array<Credit>
