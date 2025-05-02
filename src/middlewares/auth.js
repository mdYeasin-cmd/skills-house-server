import config from "../config/index.js";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js"
import { verifyJwtToken } from "../utils/verifyJwtToken.js";

const auth = (...requiredRoles) => {
    return asyncHandler(async (req, res, next) => {
        const token = req.headers.authorization;

        if (!token) {
            throw new Error("You are not authorized.");
        }

        const decoded = verifyJwtToken(token, config.jwt_access_token_secret);

        const { id, role } = decoded;

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

        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new Error("You are not authorized.");
        }

        req.user = decoded;

        next();
    })
}

export default auth;
