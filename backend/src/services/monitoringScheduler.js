import prisma from "../db/prisma.js";
import { checkServiceHealth } from "./monitoringService.js";

const MONITORING_INTERVAL = 30 * 1000;

export const runMonitoringCycle = async () => {
  try {
    const services = await prisma.service.findMany();

    if (services.length === 0) {
      console.log("Monitoring: No services to check.");
      return;
    }

    console.log(`Monitoring: Checking ${services.length} service(s)...`);

    const results = await Promise.all(
      services.map((service) => checkServiceHealth(service))
    );

    results.forEach((result) => {
      console.log(
        `Monitoring: ${result.name} → ${result.status} (${result.responseTime} ms)`
      );
    });
  } catch (error) {
    console.error("Monitoring cycle failed:", error);
  }
};

export const startMonitoring = () => {
  console.log("Monitoring scheduler started.");

  runMonitoringCycle();

  setInterval(runMonitoringCycle, MONITORING_INTERVAL);
};