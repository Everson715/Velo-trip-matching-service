export const I_PAYMENT_GATEWAY = 'IPaymentGateway';

export interface IPaymentGateway {
  capturePayment(tripId: string, amount: number, passengerId: string): Promise<boolean>;
}
