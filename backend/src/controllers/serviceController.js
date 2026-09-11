import prisma from "../db/prisma.js";

export const getServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(services);
  } catch (error) {
    console.error("Failed to fetch services:", error);

    res.status(500).json({
      message: "Failed to fetch services",
    });
  }
};

export const createService = async (req, res) => {
  try {
    const { name, description, url } = req.body;

    if (!name || !url) {
      return res.status(400).json({
        message: "Name and URL are required",
      });
    }

    const service = await prisma.service.create({
      data: {
        name,
        description,
        url,
      },
    });

    res.status(201).json(service);
  } catch (error) {
    console.error("Failed to create service:", error);

    res.status(500).json({
      message: "Failed to create service",
    });
  }
};

export const getServiceById = async (req, res) => {
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

    res.status(200).json(service);
  } catch (error) {
    console.error("Failed to fetch service:", error);

    res.status(500).json({
      message: "Failed to fetch service",
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid service ID",
      });
    }

    const { name, description, url, status } = req.body;

    const existingService = await prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(url !== undefined && { url }),
        ...(status !== undefined && { status }),
      },
    });

    res.status(200).json(service);
  } catch (error) {
    console.error("Failed to update service:", error);

    res.status(500).json({
      message: "Failed to update service",
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid service ID",
      });
    }

    const existingService = await prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    await prisma.service.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete service:", error);

    res.status(500).json({
      message: "Failed to delete service",
    });
  }
};

export const getServiceUptime = async (req, res) => {
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

    const since = new Date(
      Date.now() - 24 * 60 * 60 * 1000
    );

    const checks = await prisma.serviceCheck.findMany({
      where: {
        serviceId: id,
        checkedAt: {
          gte: since,
        },
      },
      select: {
        status: true,
        checkedAt: true,
      },
      orderBy: {
        checkedAt: "asc",
      },
    });

    if (checks.length === 0) {
      return res.status(200).json({
        serviceId: id,
        uptime: null,
        totalChecks: 0,
        successfulChecks: 0,
        failedChecks: 0,
        period: "24h",
      });
    }

    const successfulChecks = checks.filter(
      (check) => check.status === "OPERATIONAL"
    ).length;

    const failedChecks = checks.length - successfulChecks;

    const uptime =
      (successfulChecks / checks.length) * 100;

    res.status(200).json({
      serviceId: id,
      uptime: Number(uptime.toFixed(2)),
      totalChecks: checks.length,
      successfulChecks,
      failedChecks,
      period: "24h",
    });
  } catch (error) {
    console.error("Failed to calculate service uptime:", error);

    res.status(500).json({
      message: "Failed to calculate service uptime",
    });
  }
};

export const getServiceChecks = async (req, res) => {
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

    const checks = await prisma.serviceCheck.findMany({
      where: {
        serviceId: id,
      },
      orderBy: {
        checkedAt: "desc",
      },
      take: 20,
      select: {
        id: true,
        status: true,
        responseTime: true,
        checkedAt: true,
      },
    });

    res.status(200).json(checks);
  } catch (error) {
    console.error("Failed to fetch service checks:", error);

    res.status(500).json({
      message: "Failed to fetch service checks",
    });
  }
};