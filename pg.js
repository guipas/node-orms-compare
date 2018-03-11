'use strict';

const { performance } = require('perf_hooks');
const config = require('./config.js');

const { Client } = require('pg')
const client = new Client({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
});

// const test = () => {
//   let nbTry = 10;
//   let prom = Promise.resolve();
//   while (nbTry-- >= 0) {
//     prom = prom.then(() => {//eslint-disable-line
//       const startMarkerId = `pg:find:1:start:${nbTry}`;
//       const endMarkerId = `pg:find:1:end:${nbTry}`;
//       performance.mark(startMarkerId);
//       return client.query('SELECT * FROM inventory LEFT JOIN film on inventory.film_id = film.film_id;')
//         .then(results => {
//           performance.mark(endMarkerId);
//           performance.measure('PG find test 1', startMarkerId, endMarkerId);
//         })
//     });
//   }
// }

client.connect().then(() => {
  console.log(`### Start test find on pg`);
  performance.mark('pg:find:1:start');
  return client.query('SELECT * FROM inventory LEFT JOIN film on inventory.film_id = film.film_id;')
    .then(results => {
      performance.mark('pg:find:1:end');
      performance.measure('PG find test 1', 'pg:find:1:start', 'pg:find:1:end');
      const measure = performance.getEntriesByName('PG find test 1')[0];
      let associations = 0;
      results.rows.forEach(result => {
        if (result.title) {
          associations++;
        }
      })
      console.log(`### End test find on pg`);
      console.log(`### ${associations} associations`);
      console.log(`### ${results.rows.length} results`);
      console.log(measure);
      process.exit();
    });
})
.then(() => {
  client.end();
});
