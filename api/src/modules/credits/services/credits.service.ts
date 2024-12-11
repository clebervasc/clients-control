import { Injectable } from '@nestjs/common'
import { CreateCreditDto } from '../dto/create-credit.dto'
import { ValidateCreditsOwnershipService } from './validate-credits-ownership.service'
import { CreditsRepository } from 'src/shared/database/repositories/credits.repositories'
import { UpdateCreditDto } from '../dto/update-credit.dto'

@Injectable()
export class CreditsService {
  constructor(
    private readonly creditsRepo: CreditsRepository,
    private readonly validateCreditsOwnershipService: ValidateCreditsOwnershipService,
  ) {}

  async create(userId: string, createCreditDto: CreateCreditDto) {
    const { serverId, quantity, operation, date, amount } = createCreditDto

    return this.creditsRepo.create({
      data: {
        userId,
        serverId,
        quantity,
        operation,
        date,
        amount,
      },
    })
  }

  async findAllByUserId(userId: string) {
    const credits = await this.creditsRepo.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        date: true,
        operation: true,
        quantity: true,
        amount: true,
        server: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return credits.sort(
      (creditDatePrev, creditDateNext) =>
        new Date(creditDateNext.date).getTime() -
        new Date(creditDatePrev.date).getTime(),
    )
  }

  async remove(userId: string, CreditId: string) {
    await this.validateCreditsOwnershipService.validate(userId, CreditId)

    await this.creditsRepo.delete({
      where: { id: CreditId },
    })

    return null
  }

  async update(
    userId: string,
    messageId: string,
    updateCreditDto: UpdateCreditDto,
  ) {
    await this.validateCreditsOwnershipService.validate(userId, messageId)

    return this.creditsRepo.update({
      where: { id: messageId },
      data: {
        ...updateCreditDto,
      },
    })
  }
}
