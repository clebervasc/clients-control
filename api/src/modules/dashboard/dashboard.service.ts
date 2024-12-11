import { Injectable } from '@nestjs/common'
import { ClientsRepository } from 'src/shared/database/repositories/clients.repositories'

@Injectable()
export class DashboardService {
  constructor(private readonly clientsRepo: ClientsRepository) {}

  async findAllByUserId(userId: string) {
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0) // Define como meia-noite em UTC

    const yesterday = new Date(today)
    yesterday.setUTCDate(today.getUTCDate() - 1) // Retrocede um dia

    const totalClients = await this.clientsRepo.count({
      where: { userId },
    })

    const totalClientsActive = await this.clientsRepo.count({
      where: { userId, isActive: true },
    })

    const totalClientsRecurring = await this.clientsRepo.count({
      where: { userId, isRecurring: true },
    })

    const totalClientsExpirated = await this.clientsRepo.count({
      where: {
        userId,
        expirationDate: {
          lt: today,
        },
      },
    })

    return {
      totalClients,
      totalClientsActive,
      totalClientsInactive: totalClients - totalClientsActive,
      totalClientsRecurring,
      totalClientsNew: totalClients - totalClientsRecurring,
      totalClientsExpirated,
      totalCLientsNotExpirated: totalClients - totalClientsExpirated,
    }
  }
}
