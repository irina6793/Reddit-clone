'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {

//#1
   title: {
       type: DataTypes.STRING,
       allowNull: false
    },
    body: {
       type: DataTypes.STRING,
       allowNull: false
     },

//#2
    topicId: {
       type: DataTypes.INTEGER,
       allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
    role: {
       type: DataTypes.STRING,
       allowNull: false,
       defaultValue: "admin"
   },
})
  Post.associate = function(models) {
    // associations can be defined here

//#3

   Post.belongsTo(models.Topic, {
     foreignKey: "topicId",
     onDelete: "CASCADE"
   });

   Post.belongsTo(models.User, {
     foreignKey: "userId",
     onDelete: "CASCADE"
   });
 };

     return Post;
  };
