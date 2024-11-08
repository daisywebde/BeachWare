const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const reviews = sequelize.define(
    'reviews',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      content: {
        type: DataTypes.TEXT,
      },

      rating: {
        type: DataTypes.INTEGER,
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

  reviews.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.reviews.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.reviews.belongsTo(db.beaches, {
      as: 'beach',
      foreignKey: {
        name: 'beachId',
      },
      constraints: false,
    });

    db.reviews.belongsTo(db.beach_authority, {
      as: 'beach_authority',
      foreignKey: {
        name: 'beach_authorityId',
      },
      constraints: false,
    });

    db.reviews.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.reviews.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return reviews;
};
