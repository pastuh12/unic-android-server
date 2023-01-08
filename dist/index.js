"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const dao_1 = __importDefault(require("./store/dao"));
const departmentsRepository_1 = __importDefault(require("./store/departmentsRepository"));
const courierRepository_1 = __importDefault(require("./store/courierRepository"));
const department_1 = __importDefault(require("./store/models/department"));
const courier_1 = __importDefault(require("./store/models/courier"));
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 8080;
const Store = new dao_1.default(process.env.DB_NAME);
const departRepo = new departmentsRepository_1.default(Store);
const courierRepo = new courierRepository_1.default(Store);
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
    if (typeof request.body.name === "string") {
        const department = new department_1.default(undefined, request.body.name);
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
    }
    else {
        response.status(404).send({ Bad_name: String(request.body.department.name) });
    }
});
app.patch("/departments/:id", (request, response) => {
    if (typeof request.body.department === "object") {
        if (typeof request.body.department.name === "string") {
            const department = new department_1.default(+request.params.id, request.body.department.name);
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
        }
        else {
            response.status(404).send({ Bad_name: String(request.body.department.name) });
        }
    }
    else {
        response.status(404).send("Bad body");
    }
});
app.delete("/departments/:id", (request, response) => {
    departRepo.delete(+request.params.id)
        .then(() => {
        response.status(200).send();
    })
        .catch((err) => {
        console.error(err);
        response.status(500).send({ error: String(err) });
    });
});
// couriers
app.get("/couriers", (request, response) => {
    courierRepo.getAll()
        .then((data) => {
        response.json(data);
    })
        .catch(err => {
        console.error(err);
        response.status(500).send("Error");
    });
});
app.post("/couriers", (request, response) => {
    if ("courier" in request.body) {
        const courier = new courier_1.default(request.body.courier);
        courierRepo.create(courier)
            .then((data) => {
            response.json(data);
        })
            .catch(err => {
            console.error(err);
            response.status(500).json({ error: String(err) });
        });
    }
    else {
        response.status(404).json({ error: "Bad body" });
    }
});
app.patch("/couriers/:id", (request, response) => {
    if ("courier" in request.body) {
        const courier = new courier_1.default(request.body.courier);
        courierRepo.update(courier)
            .then((data) => {
            response.json(data);
        })
            .catch(err => {
            console.error(err);
            response.status(500).send("Error");
        });
    }
    else {
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
//# sourceMappingURL=index.js.map