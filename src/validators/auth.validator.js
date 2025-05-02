import { body, cookie } from "express-validator";

const logInValidationSchema = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required.")
        .isEmail().withMessage("Please enter a valid email.")
        .normalizeEmail(),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required.")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters.")
];

const refreshTokenValidationSchema = [
    cookie("refreshToken")
        .trim()
        .notEmpty().withMessage("Refresh token is required.")
];

const changePasswordValidationSchema = [
    body("oldPassword")
        .trim()
        .notEmpty().withMessage("Old password is required.")
        .isLength({ min: 6 }).withMessage("Old password must be at least 6 characters."),

    body("newPassword")
        .trim()
        .notEmpty().withMessage("New password is required.")
        .isLength({ min: 6 }).withMessage("New password must be at least 6 characters."),
];

const forgotPasswordValidationSchema = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required.")
        .isEmail().withMessage("Please enter a valid email.")
        .normalizeEmail(),
];

const resetPasswordValidationSchema = [
    body("password")
        .trim()
        .notEmpty().withMessage("Password is required.")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters."),

    body("token")
        .trim()
        .notEmpty().withMessage("Token is required."),
];

const AuthValidator = {
    logInValidationSchema,
    refreshTokenValidationSchema,
    changePasswordValidationSchema,
    forgotPasswordValidationSchema,
    resetPasswordValidationSchema
};

export default AuthValidator;