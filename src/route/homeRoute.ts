import { Router } from "express";

const router = Router();

// Home Route GET /api
router.get("/", (_req, res) => {
  res.json({ message: "Welcome to Updated Home Page!" });
});

export default router;