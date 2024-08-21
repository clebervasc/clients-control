import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { MessagesRepository } from './repositories/messages.repositories'
import { UsersRepository } from './repositories/users.repositories'
import { CreditsRepository } from './repositories/credits.repositories'
import { ServersRepository } from './repositories/servers.repositories'
import { ClientsRepository } from './repositories/clients.repositories'

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    MessagesRepository,
    CreditsRepository,
    ServersRepository,
    ClientsRepository,
  ],
  exports: [
    UsersRepository,
    MessagesRepository,
    CreditsRepository,
    ServersRepository,
    ClientsRepository,
  ],
})
export class DatabaseModule {}
