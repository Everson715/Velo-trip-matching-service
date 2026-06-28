"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = exports.TripStatus = void 0;
var TripStatus;
(function (TripStatus) {
    TripStatus["SEARCHING"] = "SEARCHING";
    TripStatus["MATCHED"] = "MATCHED";
    TripStatus["ARRIVED"] = "ARRIVED";
    TripStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TripStatus["COMPLETED"] = "COMPLETED";
    TripStatus["CANCELLED"] = "CANCELLED";
})(TripStatus || (exports.TripStatus = TripStatus = {}));
class Trip {
}
exports.Trip = Trip;
//# sourceMappingURL=trip.entity.js.map