import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  all(): string {
    return this.paymentsService.all();
  }

  @MessagePattern('payment')
  payment(@Payload() message) {
    return this.paymentsService.payment({
      amount: message.price,
      order_id: message.id,
      client_id: message.client_id,
    });
  }
}
