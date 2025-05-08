export default (sequelize, DataTypes) => {
    const Student = sequelize.define(
        "students",
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

    // Student.associate = (models) => {
    //     Student.belongsTo(models.User, { foreignKey: 'user_id' });
    // };

    return Student;
}
