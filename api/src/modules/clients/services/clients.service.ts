import { Injectable } from '@nestjs/common'
import { ClientsRepository } from 'src/shared/database/repositories/clients.repositories'
import { CreateClientDto } from '../dto/create-client.dto'
import { ValidateClientsOwnershipService } from './validate-clients-ownership.service'
import { UpdateClientDto } from '../dto/update-client.dto'
import { ClientExpirationDateSortOrderType } from '../entities/client.entity'
import { RenewClientDto } from '../dto/renew-client-dto'

import { addDays } from 'date-fns'
import { getDaysToAdd } from './utils'

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

  async findOneById(userId: string, clientId: string) {
    await this.validateClientsOwnershipService.validate(userId, clientId)

    const client = await this.clientsRepo.findFirst({
      where: { id: clientId },
      include: { server: true },
    })

    if (!client) {
      throw new Error('Client not found')
    }

    return client
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

  async renew(
    userId: string,
    clientId: string,
    RenewClientDto: RenewClientDto,
  ) {
    await this.validateClientsOwnershipService.validate(userId, clientId)

    const client = await this.clientsRepo.findFirst({
      where: { id: clientId },
    })

    if (!client) {
      throw new Error('Client not found')
    }

    const today = new Date()
    const currentExpirationDate =
      new Date(client.expirationDate) < today
        ? today
        : new Date(client.expirationDate)

    const daysToAdd = getDaysToAdd(RenewClientDto.plan)

    const newExpirationDate = addDays(currentExpirationDate, daysToAdd)

    const renewedClient = await this.clientsRepo.update({
      where: { id: clientId },
      data: {
        expirationDate: newExpirationDate,
        isActive: true,
        isRecurring: true,
        lastPayment: today,
      },
    })

    return renewedClient
  }
}
