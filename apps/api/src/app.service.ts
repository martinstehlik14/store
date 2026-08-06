import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async checkHealth() {
    const rows = await this.prisma.$queryRaw<Array<{ ok: number }>>`SELECT 1 as ok`;
    return { status: 'ok', db: rows[0]?.ok === 1 };
  }
}
