import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common'
import { CreateCreditDto } from './dto/create-credit.dto'
import { ActiveUserId } from 'src/shared/database/decorators/ActiveUserId'
import { CreditsService } from './services/credits.service'
import { UpdateCreditDto } from './dto/update-credit.dto'
@Controller('credits')
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createCreditDto: CreateCreditDto,
  ) {
    return this.creditsService.create(userId, createCreditDto)
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.creditsService.findAllByUserId(userId)
  }

  @Put(':creditId')
  update(
    @ActiveUserId() userId: string,
    @Param('creditId', ParseUUIDPipe) creditId: string,
    @Body() updateCreditDto: UpdateCreditDto,
  ) {
    return this.creditsService.update(userId, creditId, updateCreditDto)
  }

  @Delete(':creditId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('creditId', ParseUUIDPipe)
    creditId: string,
  ) {
    return this.creditsService.remove(userId, creditId)
  }
}
