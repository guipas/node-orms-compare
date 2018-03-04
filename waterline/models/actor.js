'use strict';

module.exports = {
  tableName: 'actor',

  connection: 'myDB',

  schema: true,

  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    actor_id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type : `string`,
      // model: `question`,
      // required : true
    },
  },
};
