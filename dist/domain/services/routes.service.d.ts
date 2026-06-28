export declare class RoutesService {
    optimizeRoute(points: any[]): Promise<{
        status: string;
        points: any[];
        distance: number;
        duration: number;
    }>;
    reRoute(tripId: string, currentLat: number, currentLng: number): Promise<{
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
    getMatrix(origins: any[], destinations: any[]): Promise<{
        origins: any[];
        destinations: any[];
        matrix: number[][];
    }>;
    getAlternatives(origin: any, dest: any): Promise<{
        alternatives: {
            route: string;
            distance: number;
            duration: number;
        }[];
    }>;
    simulate(history: any): Promise<{
        status: string;
    }>;
}
