import User from "../models/user.model.js";

const studentSignupIntoDB = async (data) => {
    const student = await User.create(data);

    return student;
}

const getAllUsersFromDB = async () => {
    const users = await User.findAll();

    return users;
}

const UserService = {
    getAllUsersFromDB,
    studentSignupIntoDB
}

export default UserService;