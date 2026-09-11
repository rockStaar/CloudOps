import express from "express";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServiceUptime,
  getServiceChecks
} from "../controllers/serviceController.js";
import { checkService } from "../controllers/monitoringController.js";

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getServiceById);
router.get("/:id/uptime", getServiceUptime);
router.get("/:id/checks", getServiceChecks);

router.post("/:id/check", checkService);
router.post("/", createService);

router.put("/:id", updateService);
router.delete("/:id", deleteService);


export default router;