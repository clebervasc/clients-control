import {
  ClientPaymentType,
  ClientPlanType,
  ClientProspectionType,
} from '@prisma/client'
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsPositive,
  IsOptional,
  IsUUID,
} from 'class-validator'

export class CreateClientDto {
  @IsOptional()
  @IsUUID()
  serverId?: string

  @IsNotEmpty()
  @IsDateString()
  activeDate: string

  @IsNotEmpty()
  @IsDateString()
  expirationDate: string

  @IsNotEmpty()
  @IsDateString()
  lastPayment: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  login: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  whatsapp: string

  @IsBoolean()
  @IsNotEmpty()
  isRecurring: boolean

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean

  @IsNotEmpty()
  @IsEnum(ClientPaymentType)
  paymentMethod: ClientPaymentType

  @IsNumber()
  @IsOptional()
  @IsPositive()
  discount?: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  conextions: number

  @IsOptional()
  instagram?: string

  @IsOptional()
  @IsEnum(ClientProspectionType)
  prospection?: ClientProspectionType

  @IsNotEmpty()
  @IsEnum(ClientPlanType)
  plan: ClientPlanType

  @IsOptional()
  email?: string

  @IsOptional()
  document?: string

  @IsOptional()
  observations?: string
}
