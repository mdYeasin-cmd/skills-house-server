import express from "express";
import AuthController from "../../controllers/auth.controller.js";
import auth from "../../middlewares/auth.js";
import UserRoles from "../../constants/roles.js";
import validateRequest from "../../middlewares/validateRequest.js";
import AuthValidator from "../../validators/auth.validator.js";
import validateAllowedFields from "../../middlewares/validateAllowedFields.js";

const authRouter = express.Router();

authRouter.post("/signup", AuthController.singupUser);

authRouter.post(
    "/login",
    validateAllowedFields(["email", "password"]),
    validateRequest(AuthValidator.logInValidationSchema),
    AuthController.loginUser
);

authRouter.post(
    "/refresh-token",
    validateAllowedFields(["refreshToken"]),
    validateRequest(AuthValidator.refreshTokenValidationSchema),
    AuthController.refreshToken
);

authRouter.post(
    "/change-password",
    validateAllowedFields(["oldPassword", "newPassword"]),
    auth(UserRoles.STUDENT, UserRoles.ADMIN, UserRoles.MODERATOR),
    validateRequest(AuthValidator.changePasswordValidationSchema),
    AuthController.changePassword
);

authRouter.post(
    "/forgot-password",
    validateAllowedFields(["email"]),
    validateRequest(AuthValidator.forgotPasswordValidationSchema),
    AuthController.forgotPassword
);

authRouter.post(
    "/reset-password",
    validateAllowedFields(["password", "token"]),
    validateRequest(AuthValidator.resetPasswordValidationSchema),
    AuthController.resetPassword
);

const AuthRouter = authRouter;

export default AuthRouter;