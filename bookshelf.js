'use strict';

const { performance } = require('perf_hooks');
const config = require('./config.js');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host     : config.db.host,
    user     : config.db.user,
    password : config.db.password,
    database : config.db.database,
    charset  : 'utf8'
  },
  pool: { min: 0, max: 1 }
});
const bookshelf = require('bookshelf')(knex);

const Film = bookshelf.Model.extend({
  tableName: 'film',
  // inventories : function() {
  //   return this.hasMany(Inventory, `film_id`);
  // }
});

const Inventory = bookshelf.Model.extend({
  tableName: 'inventory',
  film () {
    return this.belongsTo(Film, `film_id`, `film_id`);
  }
  // tags: function() {
  //   return this.belongsToMany(Tag);
  // }
});

// const Tag = bookshelf.Model.extend({
//   tableName: 'tags'
// })

// User.where('id', 1).fetch({withRelated: ['posts.tags']}).then(function(user) {
//   console.log(user.related('posts').toJSON());
// }).catch(function(err) {
//   console.error(err);
// });

console.log(`### Start test find on bookshelf`);
performance.mark('bookshelf:find:1:start');
Inventory.fetchAll({ withRelated : ['film'] }).then(results => {
  performance.mark('bookshelf:find:1:end');
  performance.measure('Bookshelf find test 1', 'bookshelf:find:1:start', 'bookshelf:find:1:end');
  const measure = performance.getEntriesByName('Bookshelf find test 1')[0];
  let associations = 0;
  results.forEach(result => {
    const related = result.related('film');
    if (related) {
      associations++;
    }
  });

  console.log(`### End test find on bookshelf`);
  console.log(`### ${associations} associations`);
  console.log(`### ${results.length} results`);
  console.log(measure);
  process.exit();
});
