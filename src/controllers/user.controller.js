import UserService from "../services/user.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js";
import httpStatus from "http-status";

const studentSignup = asyncHandler(async (req, res) => {
    const studentData = req.body;

    const result = await UserService.studentSignupIntoDB(studentData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student signup successfully.",
        data: result
    });
});

const applyAsInstructor = asyncHandler(async (req, res) => {
    const instructorData = req.body;

    const result = await UserService.applyAsInstructorIntoDB(instructorData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Applying for instructor position completed successfully.",
        data: result
    });
});

const createAdmin = asyncHandler(async (req, res) => {
    const result = await UserService.createAdminIntoDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin is created successfully.",
        data: result
    });
});

const createModerator = asyncHandler(async (req, res) => {
    const result = await UserService.createModeratorIntoDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Moderator is created successfully.",
        data: result
    });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const result = await UserService.getAllUsersFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All users retrieved successfully.",
        data: result
    });
});

const UserController = {
    getAllUsers,
    studentSignup,
    applyAsInstructor,
    createAdmin,
    createModerator
}

export default UserController;