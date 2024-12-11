import { PlanType } from './Plan'
import { Server } from './Server'

export type PaymentType = 'CASH' | 'PIX' | 'CARD'
export type ProspectionType =
  | 'GOOGLE'
  | 'INSTAGRAM'
  | 'YOUTUBE'
  | 'INDICATION'
  | 'OTHER'

export enum PaymentEnum {
  CASH = 'CASH',
  PIX = 'PIX',
  CARD = 'CARD',
}

export enum ProspectionEnum {
  GOOGLE = 'GOOGLE',
  INSTAGRAM = 'INSTAGRAM',
  YOUTUBE = 'YOUTUBE',
  INDICATION = 'INDICATION',
  OTHER = 'OTHER',
}

export const paymentTypeTranslation: Record<PaymentEnum, string> = {
  [PaymentEnum.CASH]: 'Dinheiro',
  [PaymentEnum.PIX]: 'Pix',
  [PaymentEnum.CARD]: 'Cartão',
}

export const prospectionTypeTranslation: Record<ProspectionEnum, string> = {
  [ProspectionEnum.GOOGLE]: 'Google',
  [ProspectionEnum.INSTAGRAM]: 'Instagram',
  [ProspectionEnum.YOUTUBE]: 'YouTube',
  [ProspectionEnum.INDICATION]: 'Indicação',
  [ProspectionEnum.OTHER]: 'Outros',
}

export interface Client {
  id: string
  userId: string
  mfcId: string
  activeDate: string
  expirationDate: string
  lastPayment: string
  name: string
  login: string
  password: string
  isRecurring: boolean
  isActive: boolean
  paymentMethod: PaymentType
  connections: number
  plan: PlanType
  whatsapp: string
  serverId: string
  discount: number | null
  instagram: string | null
  prospection: ProspectionType | null
  email: string | null
  document: string | null
  observations: string | null
  server: Server
}

export type ClientResponse = {
  clients: Array<Client>
  pagination: { page: number; limit: number; totalPages: number; total: number }
}
