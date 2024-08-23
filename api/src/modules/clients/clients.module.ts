import { Module } from '@nestjs/common'
import { ClientsController } from './clients.controller'

import { ValidateClientsOwnershipService } from './services/validate-clients-ownership.service'
import { ClientsService } from './services/clients.service'
import { ClientsJobs } from './jobs/clients.jobs'

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, ValidateClientsOwnershipService, ClientsJobs],
  exports: [ValidateClientsOwnershipService],
})
export class ClientsModule {}
