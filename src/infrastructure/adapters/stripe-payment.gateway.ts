import { Injectable, Inject } from '@nestjs/common';
import { IPaymentGateway } from '../../domain/interfaces/payment.gateway.interface';
import { PaymentIntegrationClient } from './payment.client';

@Injectable()
export class StripePaymentGateway implements IPaymentGateway {
  constructor(
    @Inject('PAYMENT_INTEGRATION_CLIENT') private paymentClient: PaymentIntegrationClient
  ) {}

  async capturePayment(tripId: string, amount: number, passengerId: string): Promise<boolean> {
    return this.paymentClient.capturePayment(tripId, amount, passengerId);
  }
}
