"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Courier {
    id;
    firstName;
    lastName;
    middleName;
    unfulfilledOrders;
    deliveryMethod;
    departmentId;
    constructor(courier) {
        this.id = courier.id;
        this.firstName = courier.firstName;
        this.lastName = courier.lastName;
        this.middleName = courier.middleName;
        this.unfulfilledOrders = courier.unfulfilledOrders;
        this.deliveryMethod = courier.deliveryMethod;
        this.departmentId = courier.departmentId;
    }
}
exports.default = Courier;
//# sourceMappingURL=courier.js.map