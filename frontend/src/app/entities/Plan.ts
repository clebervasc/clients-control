export type PlanType =
  | 'MONTHLY'
  | 'BIMONTHLY'
  | 'QUARTERLY'
  | 'HALF_YEARLY'
  | 'ANNUAL'

export type Prices = {
  monthlyPrice: number
  bimonthlyPrice: number
  quarterlyPrice: number
  halfYearlyPrice: number
  annualPrice: number
}

export type PlanDetails = {
  displayName: string
  priceKey: keyof Prices
}

export enum PlanEnum {
  MONTHLY = 'MONTHLY',
  BIMONTHLY = 'BIMONTHLY',
  QUARTERLY = 'QUARTERLY',
  HALF_YEARLY = 'HALF_YEARLY',
  ANNUAL = 'ANNUAL',
}

export enum PlanLowerEnum {
  MONTHLY = 'monthly',
  BIMONTHLY = 'bimonthly',
  QUARTERLY = 'quarterly',
  HALF_YEARLY = 'halfYearly',
  ANNUAL = 'annual',
}

export const PlanDetailsMap: Record<PlanEnum, PlanDetails> = {
  [PlanEnum.MONTHLY]: {
    displayName: 'Mensal',
    priceKey: 'monthlyPrice',
  },
  [PlanEnum.BIMONTHLY]: {
    displayName: 'Bimestral',
    priceKey: 'bimonthlyPrice',
  },
  [PlanEnum.QUARTERLY]: {
    displayName: 'Trimestral',
    priceKey: 'quarterlyPrice',
  },
  [PlanEnum.HALF_YEARLY]: {
    displayName: 'Semestral',
    priceKey: 'halfYearlyPrice',
  },
  [PlanEnum.ANNUAL]: {
    displayName: 'Anual',
    priceKey: 'annualPrice',
  },
}
