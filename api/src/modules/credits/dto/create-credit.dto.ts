import { CreditOperationType } from '@prisma/client'
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsDateString,
  IsEnum,
  IsNumber,
  IsPositive,
} from 'class-validator'

export class CreateCreditDto {
  @IsString()
  @IsUUID()
  serverId: string

  @IsNotEmpty()
  @IsDateString()
  date: Date | string

  @IsNotEmpty()
  @IsEnum(CreditOperationType)
  operation: CreditOperationType

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  quantity: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  amount: number
}
