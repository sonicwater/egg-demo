
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
      allowNull: false,
    },
    password: {
      type: CHAR(32),
      allowNull: false,
    },
    real_name: {
      type: CHAR(32),
      allowNull: true,
    },
    user_role: {
      type: INTEGER(8),
      allowNull: true,
    },
    headimg: {
      type: CHAR(32),
      allowNull: true,
    },
    login_time: {
      type: INTEGER(16),
      allowNull: true,
    },
  }, {
    freezeTableName: true,
    tableName: 'user',
    timestamps: false,
  });
  return Users;
};
