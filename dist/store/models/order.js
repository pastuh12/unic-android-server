"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class order {
    id;
    address;
    isfulFilled;
    prise;
    courierId;
    constructor(order) {
        this.id = order.id;
        this.address = order.address;
        this.isfulFilled = order.isfulFilled;
        this.prise = order.prise;
        this.courierId = order.courierId;
    }
}
exports.default = order;
//# sourceMappingURL=order.js.map