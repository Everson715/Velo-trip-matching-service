import { CreateTripDto } from '../../application/dtos/create-trip.dto';
import { PricingService } from './pricing.service';
import { ITripRepository } from '../interfaces/trip.repository.interface';
import { IPaymentGateway } from '../interfaces/payment.gateway.interface';
export declare class MatchService {
    private tripRepository;
    private paymentGateway;
    private pricingService;
    private readonly logger;
    constructor(tripRepository: ITripRepository, paymentGateway: IPaymentGateway, pricingService: PricingService);
    requestTrip(passengerId: any, dto: CreateTripDto): Promise<import("../entities/trip.entity").Trip>;
    getStatus(tripId: string): Promise<import("../entities/trip.entity").Trip>;
    cancelTrip(passengerId: any, tripId: string): Promise<import("../entities/trip.entity").Trip>;
    getAvailableTrips(driverLat: number, driverLng: number): Promise<import("../entities/trip.entity").Trip[]>;
    acceptTrip(driverId: any, tripId: string): Promise<import("../entities/trip.entity").Trip>;
    declineTrip(driverId: any, tripId: string): Promise<{
        success: boolean;
    }>;
    arriveTrip(driverId: any, tripId: string): Promise<import("../entities/trip.entity").Trip>;
    startTrip(driverId: any, tripId: string): Promise<import("../entities/trip.entity").Trip>;
    completeTrip(driverId: string, tripId: string): Promise<import("../entities/trip.entity").Trip>;
}
