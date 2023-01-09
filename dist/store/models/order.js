"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    id;
    address;
    isfulFilled;
    prise;
    courierId;
    constructor(id, address, isfulFilled, prise, courierId) {
        this.id = id;
        this.address = address;
        this.isfulFilled = isfulFilled;
        this.prise = prise;
        this.courierId = courierId;
    }
}
exports.default = Order;
//# sourceMappingURL=order.js.map