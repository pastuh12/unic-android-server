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
    allOrders;
    constructor(id, firstName, lastName, middleName, unfulfilledOrders, deliveryMethod, departmentId, allOrders) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.unfulfilledOrders = unfulfilledOrders;
        this.deliveryMethod = deliveryMethod;
        this.departmentId = departmentId;
        this.allOrders = allOrders;
    }
}
exports.default = Courier;
//# sourceMappingURL=courier.js.map