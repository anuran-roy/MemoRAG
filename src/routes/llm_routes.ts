import { Router } from "express";
import { db } from "../db/db.js";
import { llm } from "../config.js";

export const router = Router();

router.post("/llm", async (req, res) => {
    console.log(req.body);
    const prompt = await req.body.prompt;
    const response = await llm.chatCompletions(prompt);
    res.send(response);
});
