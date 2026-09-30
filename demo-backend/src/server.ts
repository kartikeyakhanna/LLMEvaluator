import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { askGemini } from "./gemini.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req,res) => {
    try{
        const {prompt} = req.body;
        if(!prompt)
        {
            return res.status(400).json({
                error:'Prompt is required',
            });
        }

        const start=Date.now();
        const result = await askGemini(prompt);
        const latencyMS=Date.now()-start;
        res.json({
            response: result.text,
            latencyMS,
        });
    } catch (error){
        console.error(error);
        res.status(500).json({
            error: "Failed to generate response.",
        });
    }
});
