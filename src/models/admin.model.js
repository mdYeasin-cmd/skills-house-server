export default (sequelize, DataTypes) => {
    const Admin = sequelize.define(
        "admins",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id"
                }
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

    return Admin;
}
