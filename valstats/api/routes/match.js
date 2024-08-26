import express from "express";
import { getMatches } from "../controllers/matchController.js";

const router = express.Router();

router.get("/:idOne/:teamOne/:idTwo/:teamTwo", getMatches);

export default router;
