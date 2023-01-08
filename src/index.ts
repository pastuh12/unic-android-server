/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as dotenv from "dotenv";
import express from "express";
import AppDAO from "./store/dao";
import DepartmentsRepository from "./store/departmentsRepository";
import CourierRepository from "./store/courierRepository";
import Department from "./store/models/department";
import Courier from "./store/models/courier";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;

const Store = new AppDAO(process.env.DB_NAME);
const departRepo = new DepartmentsRepository(Store);
const courierRepo = new CourierRepository(Store);

departRepo.createTable()
    .then(() => courierRepo.createTable())
    .then(() => console.log("success"))
    .catch((err) => console.error(err));

// departments
app.get("/departments", (request, response) => {
    departRepo.getAll()
        .then(data => response.json(data))
        .catch(err => {
            console.error(err);
            response.send("Error");
        });
});

app.post("/departments", (request, response) => {
    if (typeof request.body.department === "object") {
        if (typeof request.body.department.title === "string") {
            const department = new Department(undefined, request.body.department.title);
            departRepo.create(department)
                .then((data) => {
                    console.log("Department: ");
                    console.log(data);
                    response.json(data);
                })
                .catch(err => {
                    console.error(err);
                    response.status(500).send("Error");
                });
        } else {
            response.status(404).send({ Bad_title: String(request.body.department.title) });
        }
    } else {
        response.status(404).send("Bad body");
    }
});

app.patch("/departments/:id", (request, response) => {
    if (typeof request.body.department === "object") {
        if (typeof request.body.department.title === "string") {
            const department = new Department(+request.params.id, request.body.department.title);
            departRepo.update(department)
                .then((data) => {
                    console.log("Department: ");
                    console.log(data);
                    response.send({ Department: data });
                })
                .catch(err => {
                    console.error(err);
                    response.status(500).send({ Error: String(err) });
                });
        } else {
            response.status(404).send({ Bad_title: String(request.body.department.title) });
        }
    } else {
        response.status(404).send("Bad body");
    }
});

app.delete("/departments/:id", (request, response) => {
    departRepo.delete(+request.params.id)
        .then(
            () => {
                response.status(200).send();
            }
        )
        .catch((err) => {
            console.error(err);
            response.status(500).send({ error: String(err) });
        });
});

// couriers

app.get("/couriers", (request, response) => {
    courierRepo.getAll()
        .then(
            (data) => {
                response.json(data);
            }
        )
        .catch(
            err => {
                console.error(err);
                response.status(500).send("Error");
            }
        );
});

app.post("/couriers", (request, response) => {
    if ("courier" in request.body) {
        const courier = new Courier(request.body.courier);
        courierRepo.create(courier)
            .then((data) => {
                response.json(data);
            })
            .catch(err => {
                console.error(err);
                response.status(500).json({ error: String(err) });
            });
    } else {
        response.status(404).json({ error: "Bad body" });
    }
});

app.patch("/couriers/:id", (request, response) => {
    if ("courier" in request.body) {
        const courier = new Courier(request.body.courier);
        courierRepo.update(courier)
            .then(
                (data) => {
                    response.json(data);
                }
            )
            .catch(
                err => {
                    console.error(err);
                    response.status(500).send("Error");
                }
            );
    } else {
        response.status(404).send("Bad body");
    }
});

app.delete("/couriers/:id", (request, response) => {
    courierRepo.delete(+request.params.id)
        .then(() => response.send())
        .catch((err) => {
            console.error(err);
            response.status(500).send("Error");
        });
});

app.listen(port, () => console.log(`Running on port ${port}`));
