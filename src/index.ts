import * as dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080
app.get("/", (request, response) => {
    response.send("Hello world!");
});
app.listen(port, () => console.log(`Running on port ${port}`));
