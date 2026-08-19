import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import pkg from '../package.json';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getInfo() {
    return {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      docs: '/api/docs',
      health: '/health',
    };
  }

  async checkHealth() {
    const rows = await this.prisma.$queryRaw<Array<{ ok: number }>>`SELECT 1 as ok`;
    return { status: 'ok', db: rows[0]?.ok === 1 };
  }
}
