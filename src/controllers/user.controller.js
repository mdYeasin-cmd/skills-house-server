import UserService from "../services/user.service.js";
import asyncHandler from "../utils/asyncHandler.js";

const studentSignup = asyncHandler(async (req, res) => {
    const studentData = req.body;

    const result = await UserService.studentSignupIntoDB(studentData);

    res.status(200).json({
        message: "Successfull",
        data: result
    });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const result = await UserService.getAllUsersFromDB();

    res.status(200).json({
        message: "Successfull",
        data: result
    });
});

const UserController = {
    getAllUsers,
    studentSignup
}

export default UserController;