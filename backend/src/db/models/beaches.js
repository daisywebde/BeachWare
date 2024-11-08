const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const beaches = sequelize.define(
    'beaches',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      location: {
        type: DataTypes.TEXT,
      },

      safety_status: {
        type: DataTypes.ENUM,

        values: ['safe', 'caution', 'unsafe'],
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

  beaches.associate = (db) => {
    db.beaches.belongsToMany(db.reviews, {
      as: 'reviews',
      foreignKey: {
        name: 'beaches_reviewsId',
      },
      constraints: false,
      through: 'beachesReviewsReviews',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.beaches.hasMany(db.reviews, {
      as: 'reviews_beach',
      foreignKey: {
        name: 'beachId',
      },
      constraints: false,
    });

    //end loop

    db.beaches.belongsTo(db.beach_authorities, {
      as: 'beach_authority',
      foreignKey: {
        name: 'beach_authorityId',
      },
      constraints: false,
    });

    db.beaches.hasMany(db.file, {
      as: 'images',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.beaches.getTableName(),
        belongsToColumn: 'images',
      },
    });

    db.beaches.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.beaches.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return beaches;
};
