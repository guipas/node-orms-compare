'use strict';

module.exports = {
  tableName: 'film',

  connection: 'myDB',

  schema: true,

  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    film_id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type : `string`,
      // model: `question`,
      // required : true
    },
  },
};
