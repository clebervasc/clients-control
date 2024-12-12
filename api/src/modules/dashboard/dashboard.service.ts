import { Injectable } from '@nestjs/common'
import { ClientsRepository } from 'src/shared/database/repositories/clients.repositories'
import { getPriceByPlanType } from './utils'

@Injectable()
export class DashboardService {
  constructor(private readonly clientsRepo: ClientsRepository) {}

  async findAllByUserId(userId: string) {
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    const allClients = await this.clientsRepo.findMany({
      where: { userId },
      include: {
        server: {
          select: {
            monthlyPrice: true,
            bimonthlyPrice: true,
            quarterlyPrice: true,
            halfYearlyPrice: true,
            annualPrice: true,
          },
        },
      },
    })

    const clientsExpirated = allClients.filter(
      (client) => new Date(client.expirationDate) < today,
    )

    const clientsNotExpirated = allClients.filter(
      (client) => new Date(client.expirationDate) >= today,
    )

    const clientsActive = allClients.filter((client) => client.isActive)

    const totalAmount = (clients) =>
      clients.reduce((acc, client) => {
        const basePrice = getPriceByPlanType(client.plan, client.server)
        const discountedPrice = Math.max(0, basePrice - (client.discount || 0))
        return acc + discountedPrice
      }, 0)

    const totalClients = allClients.length

    return {
      totalClients: {
        total: totalClients,
        totalAmount: totalAmount(allClients),
      },
      totalClientsActive: clientsActive.length,
      totalClientsInactive: totalClients - clientsActive.length,
      totalClientsRecurring: allClients.filter((client) => client.isRecurring)
        .length,
      totalClientsNew:
        totalClients - allClients.filter((client) => client.isRecurring).length,
      totalClientsExpirated: {
        total: clientsExpirated.length,
        totalAmount: totalAmount(clientsExpirated),
      },
      totalClientsNotExpirated: {
        total: clientsNotExpirated.length,
        totalAmount: totalAmount(clientsNotExpirated),
      },
    }
  }
}
