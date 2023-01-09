"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CourierRepository {
    dao;
    constructor(dao) {
        this.dao = dao;
    }
    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS couriers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT,
            lastName TEXT,
            middleName TEXT,
            unfulfilledOrders INTEGER DEFAULT 0,
            allOrders INTEGER DEFAULT 0,
            deliveryMethod INTEGER DEFAULT 0,
            departmentId INTEGER,
            CONSTRAINT courier_fk_departmentsId FOREIGN KEY (departmentId)
            REFERENCES departments(id) ON UPDATE CASCADE ON DELETE CASCADE
            )`;
        return this.dao.run(sql);
    }
    create(courier) {
        return this.dao.run(`INSERT INTO couriers (firstName, lastName, middleName, unfulfilledOrders, deliveryMethod, departmentId, allOrders)
                VALUES (?, ?, ?, ?, ?, ?)`, [
            courier.firstName,
            courier.lastName,
            courier.middleName,
            courier.unfulfilledOrders,
            courier.deliveryMethod,
            courier.departmentId,
            courier.allOrders
        ])
            .then((data) => {
            if (typeof data === "object" && data && "id" in data && typeof data.id === "number") {
                courier.id = +data.id;
                return courier;
            }
        });
    }
    update(courier) {
        return this.dao.run(`UPDATE couriers SET
                firstName = ?,
                lastName = ?,
                middleName = ?,
                unfulfilledOrders = ?,
                deliveryMethod = ?,
                departmentId = ?,
                allOrders = ?
                WHERE id = ?`, [
            courier.firstName,
            courier.lastName,
            courier.middleName,
            courier.unfulfilledOrders,
            courier.deliveryMethod,
            courier.departmentId,
            courier.allOrders,
            courier.id
        ])
            .then(() => {
            return courier;
        });
    }
    delete(id) {
        return this.dao.run("DELETE FROM couriers WHERE id = ?", [id]);
    }
    getById(id) {
        return this.dao.get("SELECT * FROM couriers WHERE id = ?", [id]);
    }
    getAll() {
        return this.dao.all("SELECT * FROM couriers");
    }
}
exports.default = CourierRepository;
//# sourceMappingURL=courierRepository.js.map