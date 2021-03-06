'use strict';

const { performance } = require('perf_hooks');
const Waterline = require('waterline');
const pgAdapter = require(`sails-postgresql`);
const config = require('./config.js');

const Film = require('./waterline/models/film');
const Inventory = require('./waterline/models/inventory');
const Actor = require('./waterline/models/actor');


const waterlineConfig = {
  adapters: {
    default: pgAdapter,
    pg: pgAdapter,
  },
  connections: {
    myDB: config.db,
  },
  defaults: {
    migrate: `safe`,
  },
};

const waterline = new Waterline();
waterline.loadCollection(Waterline.Collection.extend(Film));
waterline.loadCollection(Waterline.Collection.extend(Inventory));
waterline.loadCollection(Waterline.Collection.extend(Actor));

waterline.initialize(waterlineConfig, (err, res) => {
  if (err) { return console.log(`ERR`, err); }


  console.log('### Start test 1 waterline...');
  performance.mark('waterline:find:1:start');
  res.collections.inventory.find().populate('film').then(results => {
    performance.mark('waterline:find:1:end');
    performance.measure('Waterline find test 1', 'waterline:find:1:start', 'waterline:find:1:end');
    const measure = performance.getEntriesByName('Waterline find test 1')[0];
    let associations = 0;
    results.forEach(result => {
      if (result.film) {
        associations++;
      }
    })
    console.log(`### End test 1 waterline`);
    console.log(`${results.length} results`);
    console.log(`${associations} associations`);
    console.log(measure);
    process.exit();
  });

});
