class Courier {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    unfulfilledOrders: number;
    deliveryMethod: number;
    departmentId: number;

    constructor(courier: {
        id: number,
        firstName: string,
        lastName: string,
        middleName: string,
        unfulfilledOrders: number,
        deliveryMethod: number,
        departmentId: number
    }) {
        this.id = courier.id;
        this.firstName = courier.firstName;
        this.lastName = courier.lastName;
        this.middleName = courier.middleName;
        this.unfulfilledOrders = courier.unfulfilledOrders;
        this.deliveryMethod = courier.deliveryMethod;
        this.departmentId = courier.departmentId;
    }
}

export default Courier;
