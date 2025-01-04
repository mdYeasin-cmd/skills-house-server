import UserRoles from "../constants/roles.js";
import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
    "users",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                async isUnique(value) {
                    const user = await User.findOne({ where: { email: value } });
                    if (user) {
                        throw new Error("Email must be unique.");
                    }
                },
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
            validate: {
                notEmpty: {
                    msg: "Photo cannot be empty."
                },
            }
        },
        phone: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Phone cannot be empty."
                },
            }

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
            type: Boolean,
            defaultValue: false
        }
    },
    {
        paranoid: true,
        underscored: true
    }
);

export default User;
