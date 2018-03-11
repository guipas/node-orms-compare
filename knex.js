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

console.log(`### Start test find on knex`);
performance.mark('knex:find:1:start');
knex.select('*').from('inventory').leftJoin('film', 'inventory.film_id', 'film.film_id')
.then(results => {
  performance.mark('knex:find:1:end');
  performance.measure('Knex find test 1', 'knex:find:1:start', 'knex:find:1:end');
  const measure = performance.getEntriesByName('Knex find test 1')[0];
  let associations = 0;
  results.forEach(result => {
    if (result.title) {
      associations++;
    }
  })
  console.log(`### End test find on knex`);
  console.log(`### ${associations} associations`);
  console.log(`### ${results.length} results`);
  console.log(measure);
  process.exit();
});



// console.log(`### Start test find on bookshelf`);
// performance.mark('bookshelf:find:1:start');
// Inventory.fetchAll({ withRelated : ['film'] }).then(results => {
//   performance.mark('bookshelf:find:1:end');
//   performance.measure('Bookshelf find test 1', 'bookshelf:find:1:start', 'bookshelf:find:1:end');
//   const measure = performance.getEntriesByName('Bookshelf find test 1')[0];
//   let associations = 0;
//   results.forEach(result => {
//     // console.log(result.related('film'));
//     const related = result.related('film');
//     if (related) {
//       associations++;
//     }
//   });

//   console.log(`### End test find on bookshelf`);
//   console.log(`### ${associations} associations`);
//   console.log(`### ${results.length} results`);
//   console.log(measure);
//   process.exit();
// });
