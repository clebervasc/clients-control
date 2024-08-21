import { Injectable, NotFoundException } from '@nestjs/common'
import { ServersRepository } from 'src/shared/database/repositories/servers.repositories'

@Injectable()
export class ValidateServersOwnershipService {
  constructor(private readonly serversRepo: ServersRepository) {}

  async validate(userId: string, ServerId: string) {
    const isOwner = await this.serversRepo.findFirst({
      where: { id: ServerId, userId },
    })

    if (!isOwner) {
      throw new NotFoundException('Server not found.')
    }
  }
}
