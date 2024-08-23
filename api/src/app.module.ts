import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ScheduleModule } from '@nestjs/schedule'

import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'

import { AuthGuard } from './modules/auth/auth.guard'
import { DatabaseModule } from './shared/database/database.module'
import { MessagesModule } from './modules/messages/messages.module'
import { CreditsModule } from './modules/credits/credits.module'
import { ServersModule } from './modules/servers/servers.module'
import { ClientsModule } from './modules/clients/clients.module'
import { DashboardModule } from './modules/dashboard/dashboard.module'

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    AuthModule,
    MessagesModule,
    CreditsModule,
    ServersModule,
    ClientsModule,
    DashboardModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
