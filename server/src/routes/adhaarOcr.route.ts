import { Router } from "express";
import adhaarOcrController from "../controllers/adhaarOcrController";

const adhaarOcrRouter = Router();
adhaarOcrRouter.post("/", adhaarOcrController);
export default adhaarOcrRouter;
