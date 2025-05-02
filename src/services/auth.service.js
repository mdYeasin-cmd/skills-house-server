import UserRoles from "../constants/roles.js";
import User from "../models/user.model.js";
import { generateJwtToken } from "../utils/generateJwtToken.js";
import config from "../config/index.js";
import { verifyJwtToken } from "../utils/verifyJwtToken.js";
import { generateHashedPassword, comparePassword } from "../utils/passwordUtil.js";


const singupUserIntoDB = async (data) => {
    const isUserExist = await User.findOne({
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

    const user = await User.create(data);

    return user;
}

const loginUserIntoDB = async (data) => {
    const user = await User.findOne({
        where: {
            email: data.email,
        }
    });

    if (!user) {
        throw new Error("User not found.");
    }

    if (user.is_deleted) {
        throw new Error("User is deleted.");
    }

    if (!user.is_active) {
        throw new Error("User is not active.");
    }

    const isPasswordCorrect = await comparePassword(data.password, user.password);

    if (!isPasswordCorrect) {
        throw new Error("Password is incorrect.");
    }

    const jwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    };

    const accessToken = generateJwtToken(
        jwtPayload,
        config.jwt_access_token_secret,
        config.jwt_access_token_expires_in
    );

    const refreshToken = generateJwtToken(
        jwtPayload,
        config.jwt_refresh_token_secret,
        config.jwt_refresh_token_expires_in
    );

    return {
        accessToken,
        refreshToken,
    };
}

const refreshToken = async (refreshToken) => {
    const verifiedUser = verifyJwtToken(refreshToken, config.jwt_refresh_token_secret);

    const user = await User.findOne({
        where: {
            id: verifiedUser.id
        }
    });

    if (!user) {
        throw new Error("User not found.");
    }

    if (user.is_deleted) {
        throw new Error("User is deleted.");
    }

    if (!user.is_active) {
        throw new Error("User is not active.");
    }

    const jwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    };

    const accessToken = generateJwtToken(
        jwtPayload,
        config.jwt_access_token_secret,
        config.jwt_access_token_expires_in
    );

    return {
        accessToken,
    };
}

const changePassword = async (data, userPayload) => {
    const { id, role } = userPayload;

    const user = await User.findOne({
        where: {
            id: id,
        }
    });

    if (!user) {
        throw new Error("User not found.");
    }

    if (user.is_deleted) {
        throw new Error("User is deleted.");
    }

    if (!user.is_active) {
        throw new Error("User is not active.");
    }

    const isPasswordMatch = await comparePassword(data.oldPassword, user.password);

    if (!isPasswordMatch) {
        throw new Error("Old password is incorrect.");
    }

    const hashedPassword = await generateHashedPassword(data.newPassword);

    await User.update({
        password: hashedPassword,
    }, {
        where: {
            id: id,
            role: role,
        }
    });

    return null;
}

const forgotPassword = async (email) => {
    const user = await User.findOne({
        where: {
            email: email,
        }
    });

    if (!user) {
        throw new Error("User not found.");
    }

    if (user.is_deleted) {
        throw new Error("User is deleted.");
    }

    if (!user.is_active) {
        throw new Error("User is not active.");
    }

    const jwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    };

    const resetPasswordToken = generateJwtToken(
        jwtPayload,
        config.jwt_reset_password_secret,
        config.jwt_reset_password_expires_in
    );

    const resetUiLink = `${config?.reset_pass_ui_link}?email=${user.email}&token=${resetPasswordToken}`;

    console.log(resetUiLink, "Reset UI link.");

    // TODO: Send email to user.
}

const resetPassword = async (data, token) => {
    const user = await User.findOne({
        where: {
            email: data.email,
        }
    });

    if (!user) {
        throw new Error("User not found.");
    }

    if (user.is_deleted) {
        throw new Error("User is deleted.");
    }

    if (!user.is_active) {
        throw new Error("User is not active.");
    }

    const hashedPassword = await generateHashedPassword(data.password);

    await User.update({
        password: hashedPassword,
    }, {
        where: {
            id: user.id,
        }
    });
}

const AuthService = {
    singupUserIntoDB,
    loginUserIntoDB,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword,
}

export default AuthService;
