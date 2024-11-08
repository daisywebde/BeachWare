const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const beach_authority = sequelize.define(
    'beach_authority',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  beach_authority.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.beach_authority.hasMany(db.users, {
      as: 'users_beach_authority',
      foreignKey: {
        name: 'beach_authorityId',
      },
      constraints: false,
    });

    db.beach_authority.hasMany(db.beach_authorities, {
      as: 'beach_authorities_beach_authority',
      foreignKey: {
        name: 'beach_authorityId',
      },
      constraints: false,
    });

    db.beach_authority.hasMany(db.notifications, {
      as: 'notifications_beach_authority',
      foreignKey: {
        name: 'beach_authorityId',
      },
      constraints: false,
    });

    db.beach_authority.hasMany(db.reviews, {
      as: 'reviews_beach_authority',
      foreignKey: {
        name: 'beach_authorityId',
      },
      constraints: false,
    });

    //end loop

    db.beach_authority.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.beach_authority.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return beach_authority;
};
