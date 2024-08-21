import { Injectable } from '@nestjs/common'
import { type Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'

@Injectable()
export class CreditsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.CreditCreateArgs) {
    return this.prismaService.credit.create(createDto)
  }

  findFirst(findFirstDto: Prisma.CreditFindFirstArgs) {
    return this.prismaService.credit.findFirst(findFirstDto)
  }

  findMany<T extends Prisma.CreditFindManyArgs>(
    findManyDto: Prisma.SelectSubset<T, Prisma.CreditFindManyArgs>,
  ) {
    return this.prismaService.credit.findMany(findManyDto)
  }

  delete(deleteDto: Prisma.CreditDeleteArgs) {
    return this.prismaService.credit.delete(deleteDto)
  }

  update(updateDto: Prisma.CreditUpdateArgs) {
    return this.prismaService.credit.update(updateDto)
  }
}
