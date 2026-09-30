import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { askGemini } from "./gemini.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Demo backend is running",
  });
});

app.post("/chat", async (req,res) => {
  try{
    const {prompt} = req.body;
    console.log("Received prompt:", prompt);
    if(!prompt)
        {
      return res.status(400).json({
        error:"Prompt is required",
      });
    }

    console.log("Calling Gemini...");
    const start=Date.now();
    const result = await askGemini(prompt);
    const latencyMs=Date.now()-start;
    console.log("Gemini responded.");
    res.json({
      response: result.text,
      latencyMs,
    });
  } catch (error){
    console.error("Gemini error:", error);
    res.status(500).json({
      error: "Failed to generate response.",
    });
  }
});

app.listen(3000, () => {
  console.log("Demo backend running on http://localhost:3000");
});