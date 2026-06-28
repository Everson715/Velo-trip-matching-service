"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesService = void 0;
const common_1 = require("@nestjs/common");
let RoutesService = class RoutesService {
    async optimizeRoute(points) {
        const distance = 15.4;
        const duration = 25;
        return { status: 'OK', points, distance, duration };
    }
    async reRoute(tripId, currentLat, currentLng) {
        return { status: 'RE_ROUTED', tripId, newDistance: 12.0, newDuration: 20 };
    }
    async getRoute(tripId) {
        return { tripId, active: true, path: [{ lat: -8.1, lng: -36.1 }, { lat: -8.2, lng: -36.2 }] };
    }
    async getMatrix(origins, destinations) {
        return { origins, destinations, matrix: [[15.4, 20.0], [10.2, 5.0]] };
    }
    async getAlternatives(origin, dest) {
        return { alternatives: [{ route: 'via BR-101', distance: 20, duration: 30 }] };
    }
    async simulate(history) {
        return { status: 'SIMULATED' };
    }
};
exports.RoutesService = RoutesService;
exports.RoutesService = RoutesService = __decorate([
    (0, common_1.Injectable)()
], RoutesService);
//# sourceMappingURL=routes.service.js.map