import express, { Application, Request, Response } from "express";
import homeRoute from "./route/homeRoute";
import todoRoute from "./route/todoRoute";

// App initialization
const app: Application = express();

// json middle ware
app.use(express.json());

// Route Middlewares
app.use("/api", homeRoute);
app.use("/api", todoRoute);


// Health Check Route
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

// Deafult route
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Welcome to Default route!" });
});

export default app;

