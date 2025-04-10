import User from "../models/user.model.js";

const loginUserIntoDB = async (data) => {
    const user = await User.findOne({
        where: {
            email: data.email,
        }
    })

    return user;
}

const AuthService = {
    loginUserIntoDB
}

export default AuthService;
