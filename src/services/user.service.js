import sequelize from "../db/index.js";
import ApiError from "../errors/ApiError.js";
import httpStatus from "http-status";
import db from '../models/index.js';
import { generateHashedPassword } from "../utils/passwordUtil.js";
import UserRoles from "../constants/roles.js";

const studentSignupIntoDB = async (data) => {
    const t = await sequelize.transaction();

    try {
        const isUserExist = await db.users.findOne({
            where: {
                email: data.email
            }
        });

        if (isUserExist) {
            throw new Error("User already exist.");
        }

        const hashedPassword = await generateHashedPassword(data.password);

        data.password = hashedPassword;
        data.role = UserRoles.STUDENT;
        data.is_active = true;

        const user = await db.users.create(data, { transaction: t });

        const student = await db.students.create({
            user_id: user.id
        }, { transaction: t });

        console.log(student, "Student created.");

        await t.commit();

        const { password, is_deleted, ...userData } = user.dataValues;

        return userData;
    } catch (error) {
        await t.rollback();
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message, error);
    }
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