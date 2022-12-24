class Courier {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    unfulfilledOrders: number;
    deliveryMethod: number;
    departmentId: number;

    constructor(id: number, firstName: string, lastName: string, middleName: string, unfulfilledOrders: number, deliveryMethod: number, departmentId: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.unfulfilledOrders = unfulfilledOrders;
        this.deliveryMethod = deliveryMethod;
        this.departmentId = departmentId;
    }
}

export default Courier;
