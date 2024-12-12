import { ClientPlanType } from '@prisma/client'

export const getPriceByPlanType = (planType: ClientPlanType, server: any) => {
  switch (planType) {
    case ClientPlanType.MONTHLY:
      return server.monthlyPrice || 0
    case ClientPlanType.BIMONTHLY:
      return server.bimonthlyPrice || 0
    case ClientPlanType.QUARTERLY:
      return server.quarterlyPrice || 0
    case ClientPlanType.HALF_YEARLY:
      return server.halfYearlyPrice || 0
    case ClientPlanType.ANNUAL:
      return server.annualPrice || 0
    default:
      return 0
  }
}
