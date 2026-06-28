import { MatchService } from '../../domain/services/match.service';
import { CreateTripDto } from '../dtos/create-trip.dto';
import { AcceptMatchDto, DeclineMatchDto } from '../dtos/match.dto';
export declare class MatchController {
    private matchService;
    constructor(matchService: MatchService);
    requestTrip(user: any, dto: CreateTripDto): Promise<import("../../domain/entities/trip.entity").Trip>;
    getStatus(tripId: string): Promise<import("../../domain/entities/trip.entity").Trip>;
    cancelTrip(user: any, tripId: string): Promise<import("../../domain/entities/trip.entity").Trip>;
    getAvailableTrips(lat: number, lng: number): Promise<import("../../domain/entities/trip.entity").Trip[]>;
    acceptTrip(user: any, dto: AcceptMatchDto): Promise<import("../../domain/entities/trip.entity").Trip>;
    declineTrip(user: any, dto: DeclineMatchDto): Promise<{
        success: boolean;
    }>;
    arriveTrip(user: any, tripId: string): Promise<import("../../domain/entities/trip.entity").Trip>;
    startTrip(user: any, tripId: string): Promise<import("../../domain/entities/trip.entity").Trip>;
    completeTrip(user: any, tripId: string): Promise<import("../../domain/entities/trip.entity").Trip>;
}
