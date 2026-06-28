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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchController = void 0;
const common_1 = require("@nestjs/common");
const match_service_1 = require("../../domain/services/match.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const roles_guard_1 = require("../../auth/roles.guard");
const roles_decorator_1 = require("../../auth/roles.decorator");
const current_user_decorator_1 = require("../../auth/current-user.decorator");
const create_trip_dto_1 = require("../dtos/create-trip.dto");
const match_dto_1 = require("../dtos/match.dto");
let MatchController = class MatchController {
    constructor(matchService) {
        this.matchService = matchService;
    }
    async requestTrip(user, dto) {
        return this.matchService.requestTrip(user.userId, dto);
    }
    async getStatus(tripId) {
        return this.matchService.getStatus(tripId);
    }
    async cancelTrip(user, tripId) {
        return this.matchService.cancelTrip(user.userId, tripId);
    }
    async getAvailableTrips(lat, lng) {
        return this.matchService.getAvailableTrips(Number(lat), Number(lng));
    }
    async acceptTrip(user, dto) {
        return this.matchService.acceptTrip(user.userId, dto.tripId);
    }
    async declineTrip(user, dto) {
        return this.matchService.declineTrip(user.userId, dto.tripId);
    }
    async arriveTrip(user, tripId) {
        return this.matchService.arriveTrip(user.userId, tripId);
    }
    async startTrip(user, tripId) {
        return this.matchService.startTrip(user.userId, tripId);
    }
    async completeTrip(user, tripId) {
        return this.matchService.completeTrip(user.userId, tripId);
    }
};
exports.MatchController = MatchController;
__decorate([
    (0, common_1.Post)('request'),
    (0, roles_decorator_1.Roles)('PASSENGER'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_trip_dto_1.CreateTripDto]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "requestTrip", null);
__decorate([
    (0, common_1.Get)('status/:trip_id'),
    __param(0, (0, common_1.Param)('trip_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Delete)('cancel/:trip_id'),
    (0, roles_decorator_1.Roles)('PASSENGER'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('trip_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "cancelTrip", null);
__decorate([
    (0, common_1.Get)('available-trips'),
    (0, roles_decorator_1.Roles)('DRIVER'),
    __param(0, (0, common_1.Query)('lat')),
    __param(1, (0, common_1.Query)('lng')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "getAvailableTrips", null);
__decorate([
    (0, common_1.Post)('accept'),
    (0, roles_decorator_1.Roles)('DRIVER'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, match_dto_1.AcceptMatchDto]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "acceptTrip", null);
__decorate([
    (0, common_1.Post)('decline'),
    (0, roles_decorator_1.Roles)('DRIVER'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, match_dto_1.DeclineMatchDto]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "declineTrip", null);
__decorate([
    (0, common_1.Patch)('trip/:trip_id/arrive'),
    (0, roles_decorator_1.Roles)('DRIVER'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('trip_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "arriveTrip", null);
__decorate([
    (0, common_1.Patch)('trip/:trip_id/start'),
    (0, roles_decorator_1.Roles)('DRIVER'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('trip_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "startTrip", null);
__decorate([
    (0, common_1.Patch)('trip/:trip_id/complete'),
    (0, roles_decorator_1.Roles)('DRIVER'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('trip_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "completeTrip", null);
exports.MatchController = MatchController = __decorate([
    (0, common_1.Controller)('match'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [match_service_1.MatchService])
], MatchController);
//# sourceMappingURL=match.controller.js.map