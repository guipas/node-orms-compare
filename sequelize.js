'use strict';

const config = require('./config.js');

const { performance } = require('perf_hooks');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

const Film = sequelize.define('film', {
  film_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'film',
  timestamps: false,
});

const Inventory = sequelize.define('inventory', {
  inventory_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // film: {
  //   type: Sequelize.INTEGER,
  //   field : `film_id`,
  // }
}, {
  tableName: 'inventory',
  timestamps: false,
});

// Film.belongsTo(Inventory, { foreignKey: 'film_id' });
Inventory.belongsTo(Film, { foreignKey: 'film_id' });
// Inventory.hasOne(Film, { foreignKey: 'film_id' });

console.log(`### Start test find on sequelize`);
performance.mark('sequelize:find:1:start');
Inventory.findAll({ include : ['film'] }).then(results => {
  performance.mark('sequelize:find:1:end');
  performance.measure('Sequelize find test 1', 'sequelize:find:1:start', 'sequelize:find:1:end');
    const measure = performance.getEntriesByName('Sequelize find test 1')[0];
  // console.log(x);
  let associations = 0;
  results.forEach(result => {
    if (result.film) {
      associations++;
    }
  })
  console.log(`### End test find on sequelize`);
  console.log(`### ${associations} associations`);
  console.log(`### ${results.length} results`);
  console.log(measure);
  process.exit();
})
// User.sync().then(() => {
// });