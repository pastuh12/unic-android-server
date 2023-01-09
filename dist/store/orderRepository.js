"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrdersRepository {
    dao;
    constructor(dao) {
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
    create(order) {
        return this.dao.run("INSERT INTO orders (address, prise, courierId, isfulFilled) VALUES (?, ?, ?, ?)", [order.address, order.prise, order.courierId, order.isfulFilled])
            .then((data) => {
            if (typeof data === "object" && data && "id" in data && typeof data.id === "number") {
                order.id = data.id;
                return order;
            }
        });
    }
    update(order) {
        return this.dao.run("UPDATE orders SET address = ?, prise = ?, courierId = ?, isfulFilled = ? WHERE id = ?", [order.address, order.prise, order.courierId, order.isfulFilled, order.id])
            .then(() => {
            return order;
        });
    }
    delete(id) {
        return this.dao.run("DELETE FROM orders WHERE id = ?", [id]);
    }
    getByCourierId(courierId) {
        return this.dao.all("SELECT * FROM orders WHERE courierId = ?", [courierId]);
    }
    getAll() {
        return this.dao.all("SELECT * FROM orders");
    }
}
exports.default = OrdersRepository;
//# sourceMappingURL=orderRepository.js.map