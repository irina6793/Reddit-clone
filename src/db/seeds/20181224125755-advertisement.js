'use strict';

//#1
const faker = require("faker");

//#2
let advertisement = [];

for(let i = 1 ; i <= 15 ; i++){
  advertisement.push({
    title: faker.hacker.noun(),
    description: faker.hacker.phrase()
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Advertisement", advertisement, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Advertisement", null, {});

  }
};
