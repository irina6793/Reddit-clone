'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define('Rule', {
    description: DataTypes.STRING
  });
  Rule.associate = function(models) {
    // associations can be defined here
    Rule.belongsTo(models.Topic, {
      foreignKey: "ruleId",
      foreignKey: "topicId",
      as: "banners",
      onDelete: "CASCADE"
    });
  };
  return Rule;
};
