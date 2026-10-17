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
    const timestamp=new Date().toISOString();
    const startTime=Date.now();
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
    const result = await askGemini(prompt);
    const latencyMs=Date.now()-startTime;
    const trace={
        prompt,
        response: result.response,
        model: result.model,
        latencyMs,
        inputTokens: result.usage.inputTokens,
        outputTokens: result.usage.outputTokens,
        totalTokens: result.usage.totalTokens,
        timestamp,
        status: "success",

    }
    console.log("Gemini responded.");
    console.log(trace);
    res.json(trace);
  } catch (error){
    console.error("Gemini error:", error);
    const latencyMs=Date.now()-startTime;
    const trace = {
      prompt: req.body?.prompt ?? "",
      response: "",
      model: "gemini-3.7-flash",

      latencyMs,

      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,

      timestamp,

      status: "error",

      error: error instanceof Error
        ? error.message
        : "Unknown error",
    };
    console.error("LLM Trace:");
    console.log(trace);
    res.status(500).json(trace);
  }
});

app.listen(3000, () => {
  console.log("Demo backend running on http://localhost:3000");
});