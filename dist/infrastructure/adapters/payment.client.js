"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaymentIntegrationClient_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentIntegrationClient = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let PaymentIntegrationClient = PaymentIntegrationClient_1 = class PaymentIntegrationClient {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger(PaymentIntegrationClient_1.name);
    }
    async capturePayment(tripId, finalAmount, passengerId) {
        try {
            this.logger.log(`Initiating payment capture for trip ${tripId} with amount ${finalAmount}`);
            const payload = {
                trip_id: tripId,
                amount: finalAmount,
                passenger_id: passengerId,
            };
            const paymentServiceUrl = process.env.PAYMENT_SERVICE_URL || 'http://payment-finance-service:8000/api/v1/payments/capture';
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.post(paymentServiceUrl, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }));
            if (response.status === 200 || response.status === 201) {
                this.logger.log(`Payment captured successfully for trip ${tripId}`);
                return true;
            }
            return false;
        }
        catch (error) {
            this.logger.error(`Failed to capture payment for trip ${tripId}: ${error.message}`);
            return false;
        }
    }
};
exports.PaymentIntegrationClient = PaymentIntegrationClient;
exports.PaymentIntegrationClient = PaymentIntegrationClient = PaymentIntegrationClient_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], PaymentIntegrationClient);
//# sourceMappingURL=payment.client.js.map