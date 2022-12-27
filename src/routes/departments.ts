import express from "express";

const router = express.Router();

router.use(function timeLog (req, res, next) {
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
