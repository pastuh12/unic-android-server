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

    create(depart: Department) {
        return this.dao.run(
            "INSERT INTO departments (title) VALUES (?)",
            [depart.title]);
    }

    update(department: Department) {
        return this.dao.run(
            "UPDATE departments SET title = ? WHERE id = ?",
            [department.title, department.id]
        );
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

    getTasks(departmentId: number) {
        return this.dao.all(
            "SELECT * FROM couriers WHERE departmentId = ?",
            [departmentId]);
    }
}

export default DepartmentsRepository;
