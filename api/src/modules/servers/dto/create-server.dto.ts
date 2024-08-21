import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator'

export class CreateServerDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  monthlyPrice: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  bimonthlyPrice: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  quarterlyPrice: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  halfYearlyPrice: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  annualPrice: number
}
