export interface Server {
  id: string
  userId: string
  name: string
  monthlyPrice: number
  bimonthlyPrice: number
  quarterlyPrice: number
  halfYearlyPrice: number
  annualPrice: number
  color: string
}

export type ServerResponse = Array<Server>
