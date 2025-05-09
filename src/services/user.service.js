import sequelize from "../db/index.js";
import ApiError from "../errors/ApiError.js";
import httpStatus from "http-status";
import db from '../models/index.js';
import { generateHashedPassword } from "../utils/passwordUtil.js";
import UserRoles from "../constants/roles.js";
import Status from "../constants/status.js";
import ModeratorType from "../constants/moderatorType.js";

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

        const userInfo = {
            email: data.email,
            name: data.name,
            photo: data.photo,
            phone: data.phone,
            password: hashedPassword,
            role: UserRoles.INSTRUCTOR,
            is_active: true,
        };

        const user = await db.users.create(userInfo, { transaction: t });

        const instructorInfo = {
            user_id: user.id,
            bio: data.bio,
            expertise: data.expertise,
            experience: data.experience,
            status: Status.PENDING,
        };

        const instructor = await db.instructors.create(instructorInfo, { transaction: t });

        console.log(instructor, "Instructor created.");

        await t.commit();

        const { password, is_deleted, ...userData } = user.dataValues;

        return userData;
    } catch (error) {
        await t.rollback();
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message, error);
    }
}

const createAdminIntoDB = async (data) => {
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

        const userInfo = {
            email: data.email,
            name: data.name,
            password: hashedPassword,
            role: UserRoles.ADMIN,
            is_active: true,
        };

        const user = await db.users.create(userInfo, { transaction: t });

        const adminInfo = {
            user_id: user.id,
        };

        const admin = await db.admins.create(adminInfo, { transaction: t });

        console.log(admin, "Admin created.");

        await t.commit();

        const { password, is_deleted, ...userData } = user.dataValues;

        return userData;
    } catch (error) {
        await t.rollback();
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message, error);
    }
}

const createModeratorIntoDB = async (data) => {
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

        const userInfo = {
            email: data.email,
            name: data.name,
            password: hashedPassword,
            role: UserRoles.MODERATOR,
            is_active: true,
        };

        const user = await db.users.create(userInfo, { transaction: t });

        // moderator type will be selected based on moderator creator role.
        // admin will be admin assistant, instructor will be instructor assistant.
        const moderatorInfo = {
            user_id: user.id,
            moderator_type: ModeratorType.ADMIN_ASSISTANT, // just for now
        };

        const moderator = await db.moderators.create(moderatorInfo, { transaction: t });

        console.log(moderator, "Moderator created.");

        await t.commit();

        const { password, is_deleted, ...userData } = user.dataValues;

        const returnData = {
            moderator_type: moderatorInfo.moderator_type,
            ...userData
        };

        return returnData;
    } catch (error) {
        await t.rollback();
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message, error);
    }
}

const getAllUsersFromDB = async () => {
    const users = await db.users.findAll();

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