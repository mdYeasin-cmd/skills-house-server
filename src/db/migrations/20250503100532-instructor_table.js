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
    await queryInterface.createTable('instructors', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: Sequelize.INTEGER,
      bio: Sequelize.STRING,
      expertise: Sequelize.STRING,
      experience: Sequelize.INTEGER,
      status: Sequelize.ENUM('Pending', 'Approved', 'Rejected'),
      verified_by: Sequelize.INTEGER,
      rating: Sequelize.FLOAT,
      total_income: Sequelize.FLOAT,
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
    await queryInterface.dropTable('instructors');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
