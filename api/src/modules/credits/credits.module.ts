import { Module } from '@nestjs/common'
import { CreditsController } from './credits.controller'
import { ValidateCreditsOwnershipService } from './services/validate-credits-ownership.service'
import { CreditsService } from './services/credits.service'

@Module({
  controllers: [CreditsController],
  providers: [CreditsService, ValidateCreditsOwnershipService],
  exports: [ValidateCreditsOwnershipService],
})
export class CreditsModule {}
