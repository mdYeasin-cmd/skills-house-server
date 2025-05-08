'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("moderators", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: Sequelize.INTEGER,
      moderator_type: Sequelize.ENUM(
        "admin_assistant",
        "instructor_assistant"
      ),
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      is_deleted: Sequelize.BOOLEAN,
      deleted_at: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("moderators");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
