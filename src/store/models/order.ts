class order {
    id: number;
    address: string;
    isfulFilled: boolean;
    prise: number;
    courierId: number;

    constructor(
        id: number,
        address: string,
        isfulFilled: boolean,
        prise: number,
        courierId: number
    ) {
        this.id = id;
        this.address = address;
        this.isfulFilled = isfulFilled;
        this.prise = prise;
        this.courierId = courierId;
    }
}

export default order;
