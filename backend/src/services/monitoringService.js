import prisma from "../db/prisma.js";

export const checkServiceHealth = async (service) => {
  const startTime = Date.now();

  let status;
  let responseTime;
  let httpStatus = null;
  let errorMessage = null;

  try {
    const response = await fetch(service.url, {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    });

    responseTime = Date.now() - startTime;
    httpStatus = response.status;

    status = response.ok ? "OPERATIONAL" : "DEGRADED";
  } catch (error) {
    responseTime = Date.now() - startTime;
    status = "DOWN";
    errorMessage = error.message;
  }

  // Save current service status
  await prisma.service.update({
    where: {
      id: service.id,
    },
    data: {
      status,
      responseTime,
      lastChecked: new Date(),
    },
  });

  // Save monitoring history
  await prisma.serviceCheck.create({
    data: {
      serviceId: service.id,
      status,
      responseTime,
    },
  });

  // Handle automatic incidents
  await handleAutomaticIncident(
    service,
    status,
    responseTime,
    httpStatus,
    errorMessage
  );

  return {
    serviceId: service.id,
    name: service.name,
    status,
    responseTime,
    ...(httpStatus !== null && { httpStatus }),
    ...(errorMessage && { error: errorMessage }),
  };
};

const handleAutomaticIncident = async (
  service,
  status,
  responseTime,
  httpStatus,
  errorMessage
) => {
  const activeIncident = await prisma.incident.findFirst({
    where: {
      serviceId: service.id,
      status: {
        in: ["OPEN", "INVESTIGATING"],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Service is DOWN → create an incident if one doesn't already exist
  if (status === "DOWN" && !activeIncident) {
    const monitoringUser = await prisma.user.findFirst({
      orderBy: {
        id: "asc",
      },
    });

    if (!monitoringUser) {
      console.error(
        "Cannot create automatic incident: no users exist."
      );

      return;
    }

    const description = errorMessage
      ? `Automatic monitoring detected that ${service.name} is down. Error: ${errorMessage}`
      : `Automatic monitoring detected that ${service.name} is down.`;

    await prisma.incident.create({
      data: {
        title: `${service.name} is down`,
        description,
        status: "OPEN",
        severity: "HIGH",
        serviceId: service.id,
        createdById: monitoringUser.id,
      },
    });

    console.log(
      `Automatic incident created for ${service.name}`
    );

    return;
  }

  // Service recovered → resolve the active incident
  if (status === "OPERATIONAL" && activeIncident) {
    await prisma.incident.update({
      where: {
        id: activeIncident.id,
      },
      data: {
        status: "RESOLVED",
        resolvedAt: new Date(),
      },
    });

    await prisma.incidentUpdate.create({
      data: {
        incidentId: activeIncident.id,
        message: `Automatic monitoring detected that ${service.name} has recovered. Response time: ${responseTime} ms.`,
      },
    });

    console.log(
      `Automatic incident resolved for ${service.name}`
    );
  }
};