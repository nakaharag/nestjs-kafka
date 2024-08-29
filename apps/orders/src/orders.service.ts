import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { OrderDTO } from './order.dto';
import { OrderStatus } from '.prisma/client/orders';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    @Inject('ORDERS_SERVICE')
    private kafkaClient: ClientKafka,
  ) {}

  all() {
    return this.prismaService.order.findMany();
  }

  async create(data: OrderDTO) {
    const order = this.prismaService.order.create({
      data: {
        ...data,
        status: OrderStatus.PENDING,
      },
    });
    await lastValueFrom(this.kafkaClient.emit('order', order));
    return order;
  }
}
