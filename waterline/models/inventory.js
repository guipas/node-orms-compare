'use strict';

module.exports = {
  tableName: 'inventory',

  connection: 'myDB',

  schema: true,

  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    inventory_id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true,
    },
    film: {
      columnName : `film_id`,
      model: `film`,
      // required : true
    },
  },
};
