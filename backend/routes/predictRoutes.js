import { Router } from "express";
import { getPrediction } from "../controllers/predictControllers.js";

const router = Router();
router.post("/predict", getPrediction);

export default router;
