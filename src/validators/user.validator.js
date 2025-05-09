import { body } from "express-validator";

const studentSignupValidationSchema = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required.")
        .isString().withMessage("Name must be a string."),

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

const applyAsInstructorValidationSchema = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required.")
        .isString().withMessage("Name must be a string."),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required.")
        .isEmail().withMessage("Please enter a valid email.")
        .normalizeEmail(),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required.")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters."),

    body("photo")
        .optional()
        .trim()
        .isURL().withMessage("Photo must be a valid URL."),

    body("phone")
        .trim()
        .notEmpty().withMessage("Phone number is required.")
        .matches(/^(01[3-9]\d{8})$/).withMessage("Phone number must be a valid Bangladeshi number."),

    body("bio")
        .trim()
        .notEmpty().withMessage("Bio is required.")
        .isString().withMessage("Bio must be a string.")
        .isLength({ max: 300 }).withMessage("Bio cannot exceed 300 characters."),

    body("expertise")
        .trim()
        .notEmpty().withMessage("Expertise is required.")
        .isString().withMessage("Expertise must be a string."),

    body("experience")
        .trim()
        .notEmpty().withMessage("Experience is required.")
        .isNumeric().withMessage("Experience must be a numeric value."),
];

const createAdminValidationSchema = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required.")
        .isString().withMessage("Name must be a string."),

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

const createModeratorValidationSchema = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required.")
        .isEmail().withMessage("Please enter a valid email.")
        .normalizeEmail(),

    body("name")
        .trim()
        .notEmpty().withMessage("Name is required.")
        .isString().withMessage("Name must be a string."),

    body("photo")
        .optional()
        .trim()
        .isURL().withMessage("Photo must be a valid URL."),

    body("phone")
        .trim()
        .notEmpty().withMessage("Phone number is required.")
        .matches(/^(01[3-9]\d{8})$/).withMessage("Phone number must be a valid Bangladeshi number."),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required.")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters.")
];

const UserValidator = {
    studentSignupValidationSchema,
    applyAsInstructorValidationSchema,
    createAdminValidationSchema,
    createModeratorValidationSchema
};

export default UserValidator;