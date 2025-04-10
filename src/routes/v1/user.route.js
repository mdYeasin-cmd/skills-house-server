import express from "express";
import UserController from "../../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/student-signup", UserController.studentSignup);

userRouter.post("/apply-instructor", UserController.applyAsInstructor);

userRouter.post("/create-admin", UserController.createAdmin);

userRouter.post("/create-moderator", () => UserController.createModerator);

userRouter.get("/", UserController.getAllUsers);

export default userRouter;