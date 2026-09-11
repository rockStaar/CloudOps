import prisma from "../db/prisma.js";
import { checkServiceHealth } from "../services/monitoringService.js";

export const checkService = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid service ID",
      });
    }

    const service = await prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    const result = await checkServiceHealth(service);

    res.status(200).json(result);
  } catch (error) {
    console.error("Service health check failed:", error);

    res.status(500).json({
      message: "Service health check failed",
    });
  }
};