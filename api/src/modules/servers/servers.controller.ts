import { CreateServerDto } from './dto/create-server.dto'

import { ActiveUserId } from 'src/shared/database/decorators/ActiveUserId'
import { ServersService } from './services/servers.service'
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  ParseUUIDPipe,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { UpdateServerDto } from './dto/update-server.dto'

@Controller('servers')
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createServerDto: CreateServerDto,
  ) {
    return this.serversService.create(userId, createServerDto)
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.serversService.findAllByUserId(userId)
  }

  @Put(':serverId')
  update(
    @ActiveUserId() userId: string,
    @Param('serverId', ParseUUIDPipe) serverId: string,
    @Body() updateServerDto: UpdateServerDto,
  ) {
    return this.serversService.update(userId, serverId, updateServerDto)
  }

  @Delete(':serverId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('serverId', ParseUUIDPipe)
    serverId: string,
  ) {
    return this.serversService.remove(userId, serverId)
  }
}
