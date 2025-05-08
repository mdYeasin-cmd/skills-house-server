import AuthService from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import httpStatus from "http-status";
import sendResponse from "../utils/sendResponse.js";

const loginUser = asyncHandler(async (req, res) => {
    const userData = req.body;

    const result = await AuthService.loginUserIntoDB(userData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Login successfully.",
        data: result,
    });
});

const refreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    const result = await AuthService.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Refresh token successfully.",
        data: result,
    });
});

const changePassword = asyncHandler(async (req, res) => {
    const data = req.body;
    const user = req.user;

    const result = await AuthService.changePassword(data, user);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password changed successfully.",
        data: result,
    });
});

const forgotPassword = asyncHandler(async (req, res) => {
    const email = req.body.email;

    await AuthService.forgotPassword(email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password reset link sent to your email.",
        data: null,
    });
});

const resetPassword = asyncHandler(async (req, res) => {
    const newPassword = req.body.password;
    const token = req.body.token;

    const result = await AuthService.resetPassword(newPassword, token);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password reset successfully.",
        data: result,
    });
});

const AuthController = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword,
};

export default AuthController;