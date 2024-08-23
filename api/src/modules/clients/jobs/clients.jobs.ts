import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { ClientsRepository } from 'src/shared/database/repositories/clients.repositories'

@Injectable()
export class ClientsJobs {
  private readonly logger = new Logger(ClientsJobs.name)

  constructor(private readonly clientsRepo: ClientsRepository) {}

  @Cron('0 0,12 * * *')
  async handleClientExpirationJobs() {
    this.logger.log('Running scheduled job for client expiration')

    const now = new Date()
    now.setHours(0, 0, 0, 0)

    const threeDaysAgo = new Date(now)
    threeDaysAgo.setDate(now.getDate() - 3)

    const fiveDaysAgo = new Date(now)
    fiveDaysAgo.setDate(now.getDate() - 5)

    await this.clientsRepo.updateMany({
      where: {
        expirationDate: { lte: threeDaysAgo },
        isActive: true,
      },
      data: {
        isActive: false,
      },
    })

    await this.clientsRepo.deleteMany({
      where: {
        expirationDate: { lte: fiveDaysAgo },
      },
    })

    this.logger.log('Finished client expiration job')
  }
}
