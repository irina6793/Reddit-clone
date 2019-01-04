'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Topic', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      postId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE", // delete topic if parent post is deleted
        allowNull: false,    // validation to prevent null value
        references: {        // association information
          model: "Post",   // table name
          key: "id",         // attribute to use
          as: "postId"      // reference as postId
        },
    }
  });
},
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Topic');
   }
 };
