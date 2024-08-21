import { Injectable } from '@nestjs/common'
import { ClientsRepository } from 'src/shared/database/repositories/clients.repositories'

@Injectable()
export class DashboardService {
  constructor(private readonly clientsRepo: ClientsRepository) {}

  async findAllByUserId(userId: string) {
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
          lt: new Date(),
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
