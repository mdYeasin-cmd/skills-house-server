import express from "express";
import UserRouter from "./user.route.js";

const router = express.Router();

router.use("/v1/users", UserRouter);

export default router;