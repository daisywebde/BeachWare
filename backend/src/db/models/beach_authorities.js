const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const beach_authorities = sequelize.define(
    'beach_authorities',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      contact_info: {
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

  beach_authorities.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.beach_authorities.hasMany(db.beaches, {
      as: 'beaches_beach_authority',
      foreignKey: {
        name: 'beach_authorityId',
      },
      constraints: false,
    });

    //end loop

    db.beach_authorities.belongsTo(db.beach_authority, {
      as: 'beach_authority',
      foreignKey: {
        name: 'beach_authorityId',
      },
      constraints: false,
    });

    db.beach_authorities.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.beach_authorities.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return beach_authorities;
};
