import prisma from "../db/prisma.js";

export const getIncidents = async (req, res) => {
  try {
    const incidents = await prisma.incident.findMany({
      include: {
        service: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        updates: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(incidents);
  } catch (error) {
    console.error("Failed to fetch incidents:", error);

    res.status(500).json({
      message: "Failed to fetch incidents",
    });
  }
};

export const getIncidentById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid incident ID",
      });
    }

    const incident = await prisma.incident.findUnique({
      where: { id },
      include: {
        service: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        updates: true,
      },
    });

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    res.status(200).json(incident);
  } catch (error) {
    console.error("Failed to fetch incident:", error);

    res.status(500).json({
      message: "Failed to fetch incident",
    });
  }
};

export const createIncident = async (req, res) => {
  try {
    const {
      title,
      description,
      severity,
      serviceId,
      createdById,
    } = req.body;

    if (!title || !serviceId || !createdById) {
      return res.status(400).json({
        message: "Title, service ID, and creator ID are required",
      });
    }

    const service = await prisma.service.findUnique({
      where: {
        id: Number(serviceId),
      },
    });

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(createdById),
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const incident = await prisma.incident.create({
      data: {
        title,
        description,
        severity: severity || "MEDIUM",
        serviceId: Number(serviceId),
        createdById: Number(createdById),
      },
      include: {
        service: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json(incident);
  } catch (error) {
    console.error("Failed to create incident:", error);

    res.status(500).json({
      message: "Failed to create incident",
    });
  }
};

export const updateIncident = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid incident ID",
      });
    }

    const existingIncident = await prisma.incident.findUnique({
      where: { id },
    });

    if (!existingIncident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    const {
      title,
      description,
      status,
      severity,
      resolvedAt,
    } = req.body;

    const incident = await prisma.incident.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(status !== undefined && { status }),
        ...(severity !== undefined && { severity }),
        ...(resolvedAt !== undefined && {
          resolvedAt: resolvedAt ? new Date(resolvedAt) : null,
        }),
      },
      include: {
        service: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json(incident);
  } catch (error) {
    console.error("Failed to update incident:", error);

    res.status(500).json({
      message: "Failed to update incident",
    });
  }
};

export const deleteIncident = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid incident ID",
      });
    }

    const existingIncident = await prisma.incident.findUnique({
      where: { id },
    });

    if (!existingIncident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    await prisma.incident.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Incident deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete incident:", error);

    res.status(500).json({
      message: "Failed to delete incident",
    });
  }
};

export const createIncidentUpdate = async (req, res) => {
  try {
    const incidentId = Number(req.params.id);
    const { message } = req.body;

    if (Number.isNaN(incidentId)) {
      return res.status(400).json({
        message: "Invalid incident ID",
      });
    }

    if (!message) {
      return res.status(400).json({
        message: "Update message is required",
      });
    }

    const incident = await prisma.incident.findUnique({
      where: { id: incidentId },
    });

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    const update = await prisma.incidentUpdate.create({
      data: {
        message,
        incidentId,
      },
    });

    res.status(201).json(update);
  } catch (error) {
    console.error("Failed to create incident update:", error);

    res.status(500).json({
      message: "Failed to create incident update",
    });
  }
};