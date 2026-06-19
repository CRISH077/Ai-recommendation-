import { Router, type IRouter } from "express";
import healthRouter from "./health";
import { productsRouter } from "./products.js";
import { recommendationsRouter } from "./recommendations.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/products", productsRouter);
router.use("/recommendations", recommendationsRouter);

export default router;
