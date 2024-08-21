import { Injectable, NotFoundException } from '@nestjs/common'
import { ClientsRepository } from 'src/shared/database/repositories/clients.repositories'

@Injectable()
export class ValidateClientsOwnershipService {
  constructor(private readonly clientsRepo: ClientsRepository) {}

  async validate(userId: string, clientId: string) {
    const isOwner = await this.clientsRepo.findFirst({
      where: { id: clientId, userId },
    })

    if (!isOwner) {
      throw new NotFoundException('Client not found.')
    }
  }
}
