export declare class RequestMatchDto {
    passengerId: string;
    originLatitude: number;
    originLongitude: number;
    destinationLatitude: number;
    destinationLongitude: number;
    price: number;
}
export declare class AcceptMatchDto {
    tripId: string;
}
export declare class DeclineMatchDto {
    tripId: string;
}
export declare class TripActionDto {
    tripId: string;
}
