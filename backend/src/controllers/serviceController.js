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