'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  // Add facebookId and facebookToken (specify table not model)
  return queryInterface.addColumn('users', 'facebookId', Sequelize.STRING).then(function(){
    return queryInterface.addColumn('users', 'facebookToken', Sequelize.STRING)
  });

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    // Remove columns facebookId and facebookToken
   return queryInterface.removeColumn('users', 'facebookId').then(function(){
    return queryInterface.removeColumn('users', 'facebookToken')
  });

  }
};
