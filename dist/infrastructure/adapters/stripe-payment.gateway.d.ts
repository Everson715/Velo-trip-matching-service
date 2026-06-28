import { IPaymentGateway } from '../../domain/interfaces/payment.gateway.interface';
import { PaymentIntegrationClient } from './payment.client';
export declare class StripePaymentGateway implements IPaymentGateway {
    private paymentClient;
    constructor(paymentClient: PaymentIntegrationClient);
    capturePayment(tripId: string, amount: number, passengerId: string): Promise<boolean>;
}
