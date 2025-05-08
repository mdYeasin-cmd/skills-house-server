import UserRoles from "../constants/roles.js";

export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        "users",
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: {
                        msg: "You must be provide a valid email."
                    },
                    notEmpty: {
                        msg: "Email cannot be empty."
                    },
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Name cannot be empty."
                    },
                }
            },
            photo: {
                type: DataTypes.STRING,
            },
            phone: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Password cannot be empty."
                    },
                    len: {
                        args: [6],
                        msg: "Password must be at least 6 characters long."
                    }
                }
            },
            role: {
                type: DataTypes.ENUM(
                    UserRoles.OWNER,
                    UserRoles.ADMIN,
                    UserRoles.INSTRUCTOR,
                    UserRoles.MODERATOR,
                    UserRoles.STUDENT
                ),
                validate: {
                    isIn: [[
                        UserRoles.OWNER,
                        UserRoles.ADMIN,
                        UserRoles.INSTRUCTOR,
                        UserRoles.MODERATOR,
                        UserRoles.STUDENT
                    ]],
                },
                allowNull: false,
                defaultValue: "Student"
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            paranoid: true,
            underscored: true,

        }
    );

    User.beforeCreate(async (user, options) => {
        const isUserExist = await User.findOne({ where: { email: user.email } });
        if (isUserExist) {
            throw new Error("Email must be unique.");
        };
    });

    return User;
}
