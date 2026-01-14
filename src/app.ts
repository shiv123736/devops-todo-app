import express, { Application, Request, Response } from "express";
import homeRoute from "./route/homeRoute";
import todoRoute from "./route/todoRoute";

const app: Application = express();

// json middle ware
app.use(express.json());

// Route Middlewares
app.use("/api", homeRoute);
app.use("/api", todoRoute);



console.log("Password is:12345");

// Deafult route
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Welcome to DevsOps Todo App!" });
});

export default app;

