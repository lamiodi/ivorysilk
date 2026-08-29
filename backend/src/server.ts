import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { config } from "./config/env";
import { apiRouter } from "./routes/api.routes";

const app = express();

// Security Headers with Helmet
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: [config.corsOrigin, "http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
);

// Rate Limiting (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Body Parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Register API Routes
app.use("/api", apiRouter);

// 404 Handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Central Error Middleware
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error("[SERVER ERROR]", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: config.nodeEnv === "development" ? err.message : undefined,
    });
  },
);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(
    `✨ Ivory Silk Production API running on http://localhost:${PORT} [${config.nodeEnv.toUpperCase()}]`,
  );
});
