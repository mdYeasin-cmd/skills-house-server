import ModeratorType from "../constants/moderatorType.js";

export default (sequelize, DataTypes) => {
    const Moderator = sequelize.define(
        "moderators",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id"
                }
            },
            moderator_type: {
                type: DataTypes.ENUM(
                    ModeratorType.ADMIN_ASSISTANT,
                    ModeratorType.INSTRUCTOR_ASSISTANT
                ),
                allowNull: false,
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

    return Moderator;
}
