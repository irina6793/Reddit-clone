'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topic = sequelize.define('Topic', {
    topicId: DataTypes.STRING,
    description: DataTypes.TEXT,
    title: DataTypes.STRING
  });
  Topic.associate = function(models) {
    // associations can be defined here
    Topic.hasMany(models.Banner, {
     foreignKey: "topicId",
     as: "banners"
    });
  }
  return Topic;
};
