import { Injectable } from '@nestjs/common'
import { type Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'

@Injectable()
export class ClientsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.ClientCreateArgs) {
    return this.prismaService.client.create(createDto)
  }

  findFirst(findFirstDto: Prisma.ClientFindFirstArgs) {
    return this.prismaService.client.findFirst(findFirstDto)
  }

  findMany<T extends Prisma.ClientFindManyArgs>(
    findManyDto: Prisma.SelectSubset<T, Prisma.ClientFindManyArgs>,
  ) {
    return this.prismaService.client.findMany(findManyDto)
  }

  delete(deleteDto: Prisma.ClientDeleteArgs) {
    return this.prismaService.client.delete(deleteDto)
  }

  update(updateDto: Prisma.ClientUpdateArgs) {
    return this.prismaService.client.update(updateDto)
  }

  count(countDto: Prisma.ClientCountArgs) {
    return this.prismaService.client.count(countDto)
  }

  aggregate(countDto: Prisma.ClientAggregateArgs) {
    return this.prismaService.client.aggregate(countDto)
  }

  updateMany(updateManyDto: Prisma.ClientUpdateManyArgs) {
    return this.prismaService.client.updateMany(updateManyDto)
  }

  deleteMany(deleteManyDto: Prisma.ClientDeleteManyArgs) {
    return this.prismaService.client.deleteMany(deleteManyDto)
  }
}
