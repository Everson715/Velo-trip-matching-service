"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstimatesService = void 0;
const common_1 = require("@nestjs/common");
let EstimatesService = class EstimatesService {
    async estimateRoute(origin, dest) {
        return { estimated_price: 25.50, distance_km: 10, time_mins: 15 };
    }
    async getEta(driverLat, driverLng, passengerLat, passengerLng) {
        return { eta_mins: 5 };
    }
};
exports.EstimatesService = EstimatesService;
exports.EstimatesService = EstimatesService = __decorate([
    (0, common_1.Injectable)()
], EstimatesService);
//# sourceMappingURL=estimates.service.js.map