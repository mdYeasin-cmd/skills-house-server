import express from "express";
import AuthController from "../../controllers/auth.controller.js";
import auth from "../../middlewares/auth.js";
import UserRoles from "../../constants/roles.js";

const authRouter = express.Router();

authRouter.post("/signup", AuthController.singupUser);

authRouter.post("/login", AuthController.loginUser);

authRouter.post("/refresh-token", AuthController.refreshToken);

authRouter.post(
    "/change-password",
    auth(UserRoles.STUDENT, UserRoles.ADMIN, UserRoles.MODERATOR),
    AuthController.changePassword
);

authRouter.post("/forgot-password", AuthController.forgotPassword);

authRouter.post("/reset-password", AuthController.resetPassword);

const AuthRouter = authRouter;

export default AuthRouter;