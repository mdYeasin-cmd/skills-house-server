import bcrypt from "bcrypt";

export const generateHashedPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
}

export const comparePassword = async (password, hashedPassword) => {
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    return isPasswordCorrect;
}