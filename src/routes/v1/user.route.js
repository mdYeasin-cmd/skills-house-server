import express from "express";
import UserController from "../../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/student-signup", UserController.studentSignup);

userRouter.get("/", UserController.getAllUsers);

export default userRouter;