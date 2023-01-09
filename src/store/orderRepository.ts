import Dao from "./dao";
import Order from "./models/order";

class OrdersRepository {
    dao: Dao;

    constructor(dao: Dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            address TEXT,
            prise INTEGER,
            courierId INTEGER,
            isfulFilled BOOLEAN
        );
        `;
        return this.dao.run(sql);
    }

    create(order: Order) {
        return this.dao.run(
            "INSERT INTO orders (address, prise, courierId, isfulFilled) VALUES (?, ?, ?, ?)",
            [order.address, order.prise, order.courierId, order.isfulFilled])
            .then((data) => {
                if (typeof data === "object" && data && "id" in data && typeof data.id === "number") {
                    order.id = data.id;
                    return order;
                }
            });
    }

    update(order: Order) {
        return this.dao.run(
            "UPDATE orders SET address = ?, prise = ?, courierId = ?, isfulFilled = ? WHERE id = ?",
            [order.address, order.prise, order.courierId, order.isfulFilled, order.id]
        )
            .then(() => {
                return order;
            });
    }

    delete(id: number) {
        return this.dao.run(
            "DELETE FROM orders WHERE id = ?",
            [id]
        );
    }

    getByCourierId(courierId: number) {
        return this.dao.get(
            "SELECT * FROM orders WHERE courierId = ?",
            [courierId]);
    }

    getAll() {
        return this.dao.all("SELECT * FROM orders");
    }
}

export default OrdersRepository;
