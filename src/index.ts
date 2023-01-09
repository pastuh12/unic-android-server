/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as dotenv from "dotenv";
import express from "express";
import AppDAO from "./store/dao";
import DepartmentsRepository from "./store/departmentsRepository";
import CourierRepository from "./store/courierRepository";
import Department from "./store/models/department";
import Courier from "./store/models/courier";
import Order from "./store/models/order";
import OrdersRepository from "./store/orderRepository";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;

const Store = new AppDAO(process.env.DB_NAME);
const departRepo = new DepartmentsRepository(Store);
const courierRepo = new CourierRepository(Store);
const orderRepo = new OrdersRepository(Store);

departRepo.createTable()
    .then(() => courierRepo.createTable())
    .then(() => orderRepo.createTable())
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
    if (typeof request.body.name === "string") {
        const department = new Department(undefined, request.body.name);
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
        response.status(404).send({ Bad_name: String(request.body.name) });
    }
});

app.patch("/departments/:id", (request, response) => {
    if (typeof request.body.name === "string") {
        const department = new Department(+request.params.id, request.body.name);
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
        response.status(404).send({ Bad_name: String(request.body.name) });
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
    const courier = new Courier(request.body.id, request.body.firstName, request.body.lastName, request.body.middleName, request.body.unfulfilledOrders, request.body.deliveryMethod, request.body.departmentId, request.body.allOrders);
    courierRepo.create(courier)
        .then((data) => {
            response.json(data);
        })
        .catch(err => {
            console.error(err);
            response.status(500).json({ error: String(err) });
        });
});

app.patch("/couriers/:id", (request, response) => {
    const courier = new Courier(request.body.id, request.body.firstName, request.body.lastName, request.body.middleName, request.body.unfulfilledOrders, request.body.deliveryMethod, request.body.department, request.body.allOrders);
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
}
);

app.delete("/couriers/:id", (request, response) => {
    courierRepo.delete(+request.params.id)
        .then(() => response.send())
        .catch((err) => {
            console.error(err);
            response.status(500).send("Error");
        });
});

app.get("/orders", (request, response) => {
    orderRepo.getAll()
        .then(
            (data) => {
                response.json(data);
            }
        )
        .catch(
            (err: Error) => {
                console.error(err);
                response.status(500).send(`${err.message}`);
            }
        );
});

app.post("/orders", (request, response) => {
    let isfulFilled = false;
    if (request.body.isfulFilled === 1) {
        isfulFilled = true;
    }
    const order = new Order(
        request.body.id,
        request.body.address,
        isfulFilled,
        request.body.prise,
        request.body.courierId
    );
    orderRepo.create(order)
        .then((data) => {
            response.json(data);
        })
        .catch(err => {
            console.error(err);
            response.status(500).json({ error: String(err) });
        });
});

app.patch("/orders/:id", (request, response) => {
    const order = new Order(request.body.id,
        request.body.address,
        request.body.prise,
        request.body.courierId,
        request.body.isfulFilled
    );
    orderRepo.update(order)
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
}
);

app.delete("/orders/:id", (request, response) => {
    orderRepo.delete(+request.params.id)
        .then(() => response.send())
        .catch((err) => {
            console.error(err);
            response.status(500).send("Error");
        });
});

app.listen(port, () => console.log(`Running on port ${port}`));
