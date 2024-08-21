import { Injectable, NotFoundException } from '@nestjs/common'
import { CreditsRepository } from 'src/shared/database/repositories/credits.repositories'

@Injectable()
export class ValidateCreditsOwnershipService {
  constructor(private readonly creditsRepo: CreditsRepository) {}

  async validate(userId: string, creditId: string) {
    const isOwner = await this.creditsRepo.findFirst({
      where: { id: creditId, userId },
    })

    if (!isOwner) {
      throw new NotFoundException('Credit not found.')
    }
  }
}
