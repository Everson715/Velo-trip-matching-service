import { HttpService } from '@nestjs/axios';
export declare class PaymentIntegrationClient {
    private readonly httpService;
    private readonly logger;
    constructor(httpService: HttpService);
    capturePayment(tripId: string, finalAmount: number, passengerId: string): Promise<boolean>;
}
