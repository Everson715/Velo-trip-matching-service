import { RoutesService } from '../../domain/services/routes.service';
export declare class RoutesController {
    private readonly routesService;
    constructor(routesService: RoutesService);
    optimize(payload: any): Promise<{
        status: string;
        points: any[];
        distance: number;
        duration: number;
    }>;
    reRoute(tripId: string, payload: any): Promise<{
        status: string;
        tripId: string;
        newDistance: number;
        newDuration: number;
    }>;
    getRoute(tripId: string): Promise<{
        tripId: string;
        active: boolean;
        path: {
            lat: number;
            lng: number;
        }[];
    }>;
    matrix(payload: any): Promise<{
        origins: any[];
        destinations: any[];
        matrix: number[][];
    }>;
    alternatives(payload: any): Promise<{
        alternatives: {
            route: string;
            distance: number;
            duration: number;
        }[];
    }>;
    simulate(payload: any): Promise<{
        status: string;
    }>;
}
