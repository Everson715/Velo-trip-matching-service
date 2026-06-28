import { MatchService } from './match.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { AcceptMatchDto, DeclineMatchDto } from './dto/match.dto';
export declare class MatchController {
    private matchService;
    constructor(matchService: MatchService);
    requestTrip(user: any, dto: CreateTripDto): Promise<any>;
    getStatus(tripId: string): Promise<any>;
    cancelTrip(user: any, tripId: string): Promise<any>;
    getAvailableTrips(lat: number, lng: number): Promise<any>;
    acceptTrip(user: any, dto: AcceptMatchDto): Promise<any>;
    declineTrip(user: any, dto: DeclineMatchDto): Promise<any>;
    arriveTrip(user: any, tripId: string): Promise<any>;
    startTrip(user: any, tripId: string): Promise<any>;
    completeTrip(user: any, tripId: string): Promise<any>;
}
