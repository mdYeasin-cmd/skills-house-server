import express from "express";
import UserRouter from "./user.route.js";
import AuthRouter from "./auth.router.js";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);

export default router;