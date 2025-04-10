import User from "../models/user.model.js";

const studentSignupIntoDB = async (data) => {
    const student = await User.create(data);

    return student;
}

const applyAsInstructorIntoDB = async (data) => {
    console.log(data, "Instructor apply.");
}

const createAdminIntoDB = async (data) => {
    console.log(data, "Create admin.");
}

// create-moderator
const createModeratorIntoDB = async () => {
    console.log("Moderator is created.");
}

const getAllUsersFromDB = async () => {
    const users = await User.findAll();

    return users;
}

const UserService = {
    getAllUsersFromDB,
    studentSignupIntoDB,
    applyAsInstructorIntoDB,
    createAdminIntoDB,
    createModeratorIntoDB
}

export default UserService;