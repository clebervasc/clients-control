import { Injectable } from '@nestjs/common'
import { type Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'

@Injectable()
export class ServersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.ServerCreateArgs) {
    return this.prismaService.server.create(createDto)
  }

  findFirst(findFirstDto: Prisma.ServerFindFirstArgs) {
    return this.prismaService.server.findFirst(findFirstDto)
  }

  findMany<T extends Prisma.ServerFindManyArgs>(
    findManyDto: Prisma.SelectSubset<T, Prisma.ServerFindManyArgs>,
  ) {
    return this.prismaService.server.findMany(findManyDto)
  }

  delete(deleteDto: Prisma.ServerDeleteArgs) {
    return this.prismaService.server.delete(deleteDto)
  }

  update(updateDto: Prisma.ServerUpdateArgs) {
    return this.prismaService.server.update(updateDto)
  }
}
