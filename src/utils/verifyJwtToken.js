import jwt from "jsonwebtoken";

export const verifyJwtToken = (token, secret) => {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        throw new Error("Invalid token.");
    }
}
