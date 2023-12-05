import axios from "axios";
import express from "express";
import { llm } from "./config.js";
import { db } from "./db/db.js";
import * as schemas from "./schemas/schemas.js";
import * as llm_router from "./routes/llm_routes.js";

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use("/llm", llm_router.router);

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

app.post("/db", async (req, res) => {
    console.log(req.body);
    const response = await db.select().from(schemas.users);
    res.send(response);
});

app.get("/ping", async (req, res) => {
    let errors: string[] = [];
    let success: boolean = true;
    let vectorDbResponse = await axios.get(process.env.VECTOR_DB_URL, {
        timeout: 120,
        timeoutErrorMessage: "Couldn't reach Vector DB",
    });

    if (vectorDbResponse.status != 200) {
        errors.push("Couldn't reach Vector DB");
    }

    if (errors.length > 0) {
        success = false;
    }

    if (!success) {
        res.status(400);
    }
    res.send({ success, errors });
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
