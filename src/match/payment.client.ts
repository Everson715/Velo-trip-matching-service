import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentIntegrationClient {
  private readonly logger = new Logger(PaymentIntegrationClient.name);

  constructor(private readonly httpService: HttpService) {}

  async capturePayment(tripId: string, amount: number, passengerId: string): Promise<boolean> {
    try {
      this.logger.log(`Initiating payment capture for trip ${tripId} with amount ${amount}`);
      
      const payload = {
        trip_id: tripId, // Chave de idempotência
        amount: amount,
        passenger_id: passengerId,
      };

      // Exemplo de chamada HTTP para o microserviço de pagamentos
      const paymentServiceUrl = process.env.PAYMENT_SERVICE_URL || 'http://payment-finance-service:8000/api/v1/payments/capture';
      
      const response = await lastValueFrom(
        this.httpService.post(paymentServiceUrl, payload, {
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ...' // Token de serviço para serviço
          },
        })
      );

      if (response.status === 200 || response.status === 201) {
        this.logger.log(`Payment captured successfully for trip ${tripId}`);
        return true;
      }
      return false;
    } catch (error) {
      this.logger.error(`Failed to capture payment for trip ${tripId}: ${error.message}`);
      // Em um cenário real, poderíamos colocar em uma fila DLQ ou retentar
      return false;
    }
  }
}
