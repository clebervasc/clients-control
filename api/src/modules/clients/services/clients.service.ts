import { Injectable } from '@nestjs/common'
import { ClientsRepository } from 'src/shared/database/repositories/clients.repositories'
import { CreateClientDto } from '../dto/create-client.dto'
import { ValidateClientsOwnershipService } from './validate-clients-ownership.service'
import { UpdateClientDto } from '../dto/update-client.dto'
import { ClientExpirationDateSortOrderType } from '../entities/client.entity'

@Injectable()
export class ClientsService {
  constructor(
    private readonly clientsRepo: ClientsRepository,
    private readonly validateClientsOwnershipService: ValidateClientsOwnershipService,
  ) {}

  async create(userId: string, createClientDto: CreateClientDto) {
    return this.clientsRepo.create({
      data: {
        userId,
        ...createClientDto,
      },
    })
  }

  async findAllByUserId(
    userId: string,
    expirationSortOrder: ClientExpirationDateSortOrderType = ClientExpirationDateSortOrderType.ASC,
    login?: string,
    isActive?: string,
    page: number = 1,
    limit: number = 1,
  ) {
    // pagination
    const validatedPage = Math.max(page, 1)
    const validatedLimit = Math.max(limit, 1)
    const skip = (validatedPage - 1) * validatedLimit
    const total = await this.clientsRepo.count({ where: { userId } })
    const totalPages = Math.ceil(total / validatedLimit)
    // end pagination

    const clients = await this.clientsRepo.findMany({
      where: {
        userId,
        ...(login && { login }),
        ...((isActive === 'true' || isActive === 'false') && {
          isActive: isActive === 'true',
        }),
      },
      include: {
        server: true,
      },
      orderBy: [{ expirationDate: expirationSortOrder }, { isActive: 'desc' }],
      skip,
      take: validatedLimit,
    })

    return {
      clients,
      pagination: {
        page: validatedPage,
        limit: validatedLimit,
        totalPages,
        total,
      },
    }
  }

  async remove(userId: string, clientId: string) {
    await this.validateClientsOwnershipService.validate(userId, clientId)

    await this.clientsRepo.delete({
      where: { id: clientId },
    })

    return null
  }

  async update(
    userId: string,
    clientId: string,
    updateClientDto: UpdateClientDto,
  ) {
    await this.validateClientsOwnershipService.validate(userId, clientId)

    return this.clientsRepo.update({
      where: { id: clientId },
      data: {
        ...updateClientDto,
      },
    })
  }
}
