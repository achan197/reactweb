import express from "express";
import {
  getTeam,
  getTeams,
  getMapStats,
} from "../controllers/teamController.js";

const router = express.Router();

router.get("/", getTeams);
router.get("/:id/:team", getTeam);
router.get("/stats/:idOne/:teamOne/:idTwo/:teamTwo", getMapStats);

export default router;
