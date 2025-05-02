import jwt from "jsonwebtoken";

export function generateJwtToken(payload, secret, expiresIn) {
    return jwt.sign(payload, secret, { expiresIn });
}