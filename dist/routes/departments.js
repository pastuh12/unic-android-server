"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
});
// define the home page route
router.get("/", (req, res) => {
    res.send("Get all departments");
});
router.post("/");
// define the about route
router.post("/bigEntity", (req, res) => {
    res.send("On post bigEntity");
});
router.delete("/bigEntity", (req, res) => {
    res.send("On delete bigEntity");
});
module.exports = router;
//# sourceMappingURL=departments.js.map