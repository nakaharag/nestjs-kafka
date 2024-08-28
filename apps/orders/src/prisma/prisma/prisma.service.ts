import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '.prisma/client/orders';
import { INestApplication } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
