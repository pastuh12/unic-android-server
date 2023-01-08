class order {
    id: number;
    address: string;
    isfulFilled: boolean;
    prise: number;
    courierId: number;

    constructor(order: {
        id: number,
        address: string,
        isfulFilled: boolean,
        prise: number,
        courierId: number
    }) {
        this.id = order.id;
        this.address = order.address;
        this.isfulFilled = order.isfulFilled;
        this.prise = order.prise;
        this.courierId = order.courierId;
    }
}

export default order;
