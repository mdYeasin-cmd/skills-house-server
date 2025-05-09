import express from "express";
import UserController from "../../controllers/user.controller.js";
import validateAllowedFields from "../../middlewares/validateAllowedFields.js";
import validateRequest from "../../middlewares/validateRequest.js";
import UserValidator from "../../validators/user.validator.js";

const userRouter = express.Router();

userRouter.post(
    "/student-signup",
    validateAllowedFields(["name", "email", "password"]),
    validateRequest(UserValidator.studentSignupValidationSchema),
    UserController.studentSignup
);

userRouter.post(
    "/apply-instructor",
    validateAllowedFields([
        "name",
        "email",
        "password",
        "photo",
        "phone",
        "bio",
        "expertise",
        "experience"
    ]),
    validateRequest(UserValidator.applyAsInstructorValidationSchema),
    UserController.applyAsInstructor
);

userRouter.post(
    "/create-admin",
    validateAllowedFields(["name", "email", "password"]),
    validateRequest(UserValidator.createAdminValidationSchema),
    UserController.createAdmin
);

userRouter.post(
    "/create-moderator",
    validateAllowedFields(["email", "name", "photo", "phone", "password"]),
    validateRequest(UserValidator.createModeratorValidationSchema),
    UserController.createModerator
);

userRouter.get("/", UserController.getAllUsers);

export default userRouter;