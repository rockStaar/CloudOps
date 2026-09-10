import express from "express";

import {
  getIncidents,
  getIncidentById,
  createIncident,
  updateIncident,
  deleteIncident,
  createIncidentUpdate,
} from "../controllers/incidentController.js";

import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getIncidents);
router.get("/:id", getIncidentById);

router.post("/", authenticateToken, createIncident);
router.put("/:id", authenticateToken, updateIncident);
router.delete("/:id", authenticateToken, deleteIncident);
router.post("/:id/updates", authenticateToken, createIncidentUpdate);

export default router;