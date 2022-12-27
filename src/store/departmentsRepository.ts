import Dao from "./dao";
import Department from "./models/department";

class DepartmentsRepository {
    dao: Dao;

    constructor(dao: Dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS departments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT
        );`;
        return this.dao.run(sql);
    }

    create(department: Department) {
        return this.dao.run(
            "INSERT INTO departments (title) VALUES (?)",
            [department.title])
            .then((data) => {
                if (typeof data === "object" && data && "id" in data && typeof data.id === "number") {
                    department.id = data.id;
                    return department;
                }
            });
    }

    update(department: Department) {
        return this.dao.run(
            "UPDATE departments SET title = ? WHERE id = ?",
            [department.title, department.id]
        )
            .then(() => {
                return department;
            });
    }

    delete(id: number) {
        return this.dao.run(
            "DELETE FROM departments WHERE id = ?",
            [id]
        );
    }

    getById(id: number) {
        return this.dao.get(
            "SELECT * FROM departments WHERE id = ?",
            [id]);
    }

    getAll() {
        return this.dao.all("SELECT * FROM departments");
    }

    getCouriers(departmentId: number) {
        return this.dao.all(
            "SELECT * FROM couriers WHERE departmentId = ?",
            [departmentId]);
    }
}

export default DepartmentsRepository;
