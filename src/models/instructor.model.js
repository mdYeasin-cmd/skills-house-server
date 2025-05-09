import Status from "../constants/status.js";

export default (sequelize, DataTypes) => {
    const Instructor = sequelize.define(
        "instructors",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id"
                }
            },
            bio: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            expertise: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // teaching_topics: {
            //     type: DataTypes.JSON,
            //     allowNull: false,
            // },
            experience: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM(
                    Status.PENDING,
                    Status.APPROVED,
                    Status.REJECTED
                ),
                allowNull: false,
                defaultValue: Status.PENDING,
            },
            verified_by: {
                type: DataTypes.INTEGER,
                references: {
                    model: "users",
                    key: "id"
                }
            },
            rating: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0,
            },
            total_income: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0,
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

    return Instructor;
}
