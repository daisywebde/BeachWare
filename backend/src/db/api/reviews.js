const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ReviewsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reviews = await db.reviews.create(
      {
        id: data.id || undefined,

        content: data.content || null,
        rating: data.rating || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await reviews.setUser(data.user || null, {
      transaction,
    });

    await reviews.setBeach(data.beach || null, {
      transaction,
    });

    await reviews.setBeach_authority(data.beach_authority || null, {
      transaction,
    });

    return reviews;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const reviewsData = data.map((item, index) => ({
      id: item.id || undefined,

      content: item.content || null,
      rating: item.rating || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const reviews = await db.reviews.bulkCreate(reviewsData, { transaction });

    // For each item created, replace relation files

    return reviews;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const reviews = await db.reviews.findByPk(id, {}, { transaction });

    await reviews.update(
      {
        content: data.content || null,
        rating: data.rating || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await reviews.setUser(data.user || null, {
      transaction,
    });

    await reviews.setBeach(data.beach || null, {
      transaction,
    });

    await reviews.setBeach_authority(data.beach_authority || null, {
      transaction,
    });

    return reviews;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reviews = await db.reviews.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of reviews) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of reviews) {
        await record.destroy({ transaction });
      }
    });

    return reviews;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reviews = await db.reviews.findByPk(id, options);

    await reviews.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await reviews.destroy({
      transaction,
    });

    return reviews;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const reviews = await db.reviews.findOne({ where }, { transaction });

    if (!reviews) {
      return reviews;
    }

    const output = reviews.get({ plain: true });

    output.user = await reviews.getUser({
      transaction,
    });

    output.beach = await reviews.getBeach({
      transaction,
    });

    output.beach_authority = await reviews.getBeach_authority({
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
        model: db.users,
        as: 'user',
      },

      {
        model: db.beaches,
        as: 'beach',
      },

      {
        model: db.beach_authority,
        as: 'beach_authority',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.content) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('reviews', 'content', filter.content),
        };
      }

      if (filter.ratingRange) {
        const [start, end] = filter.ratingRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            rating: {
              ...where.rating,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            rating: {
              ...where.rating,
              [Op.lte]: end,
            },
          };
        }
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

      if (filter.user) {
        const listItems = filter.user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          userId: { [Op.or]: listItems },
        };
      }

      if (filter.beach) {
        const listItems = filter.beach.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          beachId: { [Op.or]: listItems },
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
          count: await db.reviews.count({
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
      : await db.reviews.findAndCountAll({
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
          Utils.ilike('reviews', 'content', query),
        ],
      };
    }

    const records = await db.reviews.findAll({
      attributes: ['id', 'content'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['content', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.content,
    }));
  }
};
