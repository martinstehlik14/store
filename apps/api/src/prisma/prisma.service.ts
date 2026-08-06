import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { createPrismaAdapter } from '../../prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ adapter: createPrismaAdapter() });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
