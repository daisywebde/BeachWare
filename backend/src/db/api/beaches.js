const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class BeachesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const beaches = await db.beaches.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        location: data.location || null,
        safety_status: data.safety_status || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await beaches.setBeach_authority(data.beach_authority || null, {
      transaction,
    });

    await beaches.setReviews(data.reviews || [], {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.beaches.getTableName(),
        belongsToColumn: 'images',
        belongsToId: beaches.id,
      },
      data.images,
      options,
    );

    return beaches;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const beachesData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      location: item.location || null,
      safety_status: item.safety_status || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const beaches = await db.beaches.bulkCreate(beachesData, { transaction });

    // For each item created, replace relation files

    for (let i = 0; i < beaches.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.beaches.getTableName(),
          belongsToColumn: 'images',
          belongsToId: beaches[i].id,
        },
        data[i].images,
        options,
      );
    }

    return beaches;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const beaches = await db.beaches.findByPk(id, {}, { transaction });

    await beaches.update(
      {
        name: data.name || null,
        location: data.location || null,
        safety_status: data.safety_status || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await beaches.setBeach_authority(data.beach_authority || null, {
      transaction,
    });

    await beaches.setReviews(data.reviews || [], {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.beaches.getTableName(),
        belongsToColumn: 'images',
        belongsToId: beaches.id,
      },
      data.images,
      options,
    );

    return beaches;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const beaches = await db.beaches.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of beaches) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of beaches) {
        await record.destroy({ transaction });
      }
    });

    return beaches;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const beaches = await db.beaches.findByPk(id, options);

    await beaches.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await beaches.destroy({
      transaction,
    });

    return beaches;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const beaches = await db.beaches.findOne({ where }, { transaction });

    if (!beaches) {
      return beaches;
    }

    const output = beaches.get({ plain: true });

    output.reviews_beach = await beaches.getReviews_beach({
      transaction,
    });

    output.images = await beaches.getImages({
      transaction,
    });

    output.reviews = await beaches.getReviews({
      transaction,
    });

    output.beach_authority = await beaches.getBeach_authority({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.beach_authorities,
        as: 'beach_authority',
      },

      {
        model: db.reviews,
        as: 'reviews',
        through: filter.reviews
          ? {
              where: {
                [Op.or]: filter.reviews.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.reviews ? true : null,
      },

      {
        model: db.file,
        as: 'images',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('beaches', 'name', filter.name),
        };
      }

      if (filter.location) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('beaches', 'location', filter.location),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.safety_status) {
        where = {
          ...where,
          safety_status: filter.safety_status,
        };
      }

      if (filter.beach_authority) {
        const listItems = filter.beach_authority.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          beach_authorityId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.beaches.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.beaches.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('beaches', 'name', query),
        ],
      };
    }

    const records = await db.beaches.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
