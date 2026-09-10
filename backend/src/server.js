import express from "express";
import serviceRoutes from "./routes/serviceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import incidentRoutes from "./routes/incidentRoutes.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "CloudOps API is running",
  });
});

app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/incidents", incidentRoutes);

app.listen(PORT, () => {
  console.log(`CloudOps API running on http://localhost:${PORT}`);
});
