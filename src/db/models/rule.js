'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define('Rule', {
    topicId: DataTypes.STRING,
    description: DataTypes.TEXT
});
  Rule.associate = function(models.Topic, {
      id: DataTypes.STRING,
      source: VARCHAR(255),
      description: VARCHAR(255),
      topicId: INTEGER
    });
  Rule.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });

  return Rule;
};
