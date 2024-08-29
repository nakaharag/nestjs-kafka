import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { PaymentStatus } from './prisma/client/payment';
import { PaymentDTO } from './payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prismaService: PrismaService) {}
  
  all() {
    return this.prismaService.payment.findMany();
  }

  payment(data: PaymentDTO) {
    return this.prismaService.payment.create({
      data: { 
        ...data,
        status: PaymentStatus.APPROVED,
       },
    });
  }
}
