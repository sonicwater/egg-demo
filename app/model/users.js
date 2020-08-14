
'use strict';
module.exports = app => {
  const { INTEGER, CHAR } = app.Sequelize;
  const Users = app.model.define('Users', {
    user_id: {
      type: CHAR(32),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: CHAR(32),
      allowNull: true,
    },
    password: {
      type: CHAR(32),
      allowNull: true,
    },
    real_name: {
      type: CHAR(32),
      allowNull: false,
    },
    user_role: {
      type: INTEGER(8),
      allowNull: false,
    },
    headimg: {
      type: CHAR(32),
      allowNull: false,
    },
    login_time: {
      type: INTEGER(16),
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    tableName: 'user',
    timestamps: false,
  });
  return Users;
};
