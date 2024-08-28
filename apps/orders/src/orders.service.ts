import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { OrderDTO } from './order.dto';
import { OrderStatus } from '.prisma/client/orders';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  all() {
    return this.prismaService.order.findMany();
  }

  create(data: OrderDTO) {
    return this.prismaService.order.create({ 
      data: {
        ...data,
        status: OrderStatus.PENDING
      }
     });
  }
}
