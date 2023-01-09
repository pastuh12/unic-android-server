"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class order {
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
exports.default = order;
//# sourceMappingURL=order.js.map