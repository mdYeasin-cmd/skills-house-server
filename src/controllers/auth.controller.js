import AuthService from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";

const loginUser = asyncHandler(async (req, res) => {
    const userData = req.body;

    const result = await AuthService.loginUserIntoDB(userData);

    res.status(200).json({
        message: "Login successfully.",
        data: result
    });
});

const AuthController = {
    loginUser
}

export default AuthController;