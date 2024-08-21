import { Injectable } from '@nestjs/common'
import { type Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'

@Injectable()
export class MessagesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.MessageCreateArgs) {
    return this.prismaService.message.create(createDto)
  }

  findFirst(findFirstDto: Prisma.MessageFindFirstArgs) {
    return this.prismaService.message.findFirst(findFirstDto)
  }

  findMany<T extends Prisma.MessageFindManyArgs>(
    findManyDto: Prisma.SelectSubset<T, Prisma.MessageFindManyArgs>,
  ) {
    return this.prismaService.message.findMany(findManyDto)
  }

  delete(deleteDto: Prisma.MessageDeleteArgs) {
    return this.prismaService.message.delete(deleteDto)
  }

  update(updateDto: Prisma.MessageUpdateArgs) {
    return this.prismaService.message.update(updateDto)
  }
}
