import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
// import rateLimit from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";
import adhaarOcrRouter from "./routes/adhaarOcr.route";

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(helmet());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });
// app.use(limiter);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL as string],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API is running" });
});

app.use("/api/ocr", adhaarOcrRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ status: false, message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
