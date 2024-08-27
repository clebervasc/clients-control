import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  ParseIntPipe,
} from '@nestjs/common'
import { ActiveUserId } from 'src/shared/database/decorators/ActiveUserId'

import { CreateClientDto } from './dto/create-client.dto'
import { ClientsService } from './services/clients.service'
import { UpdateClientDto } from './dto/update-client.dto'
import { ClientExpirationDateSortOrderType } from './entities/client.entity'
import { OptionalParseEnumPipe } from 'src/shared/pipes/OptionalParseEnumPipe'

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createClientDto: CreateClientDto,
  ) {
    return this.clientsService.create(userId, createClientDto)
  }

  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query(
      'expirationSortOrder',
      new OptionalParseEnumPipe(ClientExpirationDateSortOrderType),
    )
    expirationSortOrder?: ClientExpirationDateSortOrderType,
    @Query('login') login?: string,
    @Query('isActive') isActive?: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 1,
  ) {
    return this.clientsService.findAllByUserId(
      userId,
      expirationSortOrder,
      login,
      isActive,
      page,
      limit,
    )
  }

  @Put(':clientId')
  update(
    @ActiveUserId() userId: string,
    @Param('clientId', ParseUUIDPipe) clientId: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.update(userId, clientId, updateClientDto)
  }

  @Delete(':clientId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('clientId', ParseUUIDPipe)
    clientId: string,
  ) {
    return this.clientsService.remove(userId, clientId)
  }
}
