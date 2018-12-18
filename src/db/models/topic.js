'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topic = sequelize.define('Topic', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  });
  Topic.associate = function(models) {
    // associations can be defined here
    Topic.hasMany(models.Banner, {
     foreignKey: "bannerId",
     as: "banners",
     onDelete: "CASCADE",
     validate: true
    }).catch(errors => {
      /* console.log(errors) would look like:
      [
        { record:
        ...
        name: 'SequelizeBulkRecordError',
        message: 'Validation error',
        errors:
          { name: 'SequelizeValidationError',
            message: 'Validation error',
            errors: [Object] } },
        { record:
          ...
          name: 'SequelizeBulkRecordError',
          message: 'Validation error',
          errors:
            { name: 'SequelizeValidationError',
            message: 'Validation error',
            errors: [Object] } }
      ]
      */
  });
  return Topic;
};
}
