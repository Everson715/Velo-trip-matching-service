import { RoutesService } from './routes.service';
export declare class RoutesController {
    private readonly routesService;
    constructor(routesService: RoutesService);
    optimize(payload: any): Promise<any>;
    reRoute(tripId: string, payload: any): Promise<any>;
    getRoute(tripId: string): Promise<any>;
    matrix(payload: any): Promise<any>;
    alternatives(payload: any): Promise<any>;
    simulate(payload: any): Promise<any>;
}
