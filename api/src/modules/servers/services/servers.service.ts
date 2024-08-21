import { Injectable } from '@nestjs/common'

import { ValidateServersOwnershipService } from './validate-servers-ownership.service'
import { ServersRepository } from 'src/shared/database/repositories/servers.repositories'
import { CreateServerDto } from '../dto/create-server.dto'
import { UpdateServerDto } from '../dto/update-server.dto'

@Injectable()
export class ServersService {
  constructor(
    private readonly serversRepo: ServersRepository,
    private readonly validateCreditsOwnershipService: ValidateServersOwnershipService,
  ) {}

  async create(userId: string, createServerDto: CreateServerDto) {
    const {
      name,
      monthlyPrice,
      bimonthlyPrice,
      quarterlyPrice,
      halfYearlyPrice,
      annualPrice,
    } = createServerDto

    return this.serversRepo.create({
      data: {
        userId,
        name,
        monthlyPrice,
        bimonthlyPrice,
        quarterlyPrice,
        halfYearlyPrice,
        annualPrice,
      },
    })
  }

  async findAllByUserId(userId: string) {
    const servers = await this.serversRepo.findMany({
      where: { userId },
    })

    return servers
  }

  async remove(userId: string, ServerId: string) {
    await this.validateCreditsOwnershipService.validate(userId, ServerId)

    await this.serversRepo.delete({
      where: { id: ServerId },
    })

    return null
  }

  async update(
    userId: string,
    messageId: string,
    updateServerDto: UpdateServerDto,
  ) {
    await this.validateCreditsOwnershipService.validate(userId, messageId)

    return this.serversRepo.update({
      where: { id: messageId },
      data: {
        ...updateServerDto,
      },
    })
  }
}
