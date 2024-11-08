const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('SuperAdmin'),
        name: 'Super Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('beach_supervisor'),
        name: 'beach_supervisor',
        createdAt,
        updatedAt,
      },

      {
        id: getId('regional_manager'),
        name: 'regional_manager',
        createdAt,
        updatedAt,
      },

      {
        id: getId('beach_manager'),
        name: 'beach_manager',
        createdAt,
        updatedAt,
      },

      {
        id: getId('safety_officer'),
        name: 'safety_officer',
        createdAt,
        updatedAt,
      },

      { id: getId('regular_user'), name: 'regular_user', createdAt, updatedAt },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'beach_authorities',
      'beaches',
      'notifications',
      'reviews',
      'roles',
      'permissions',
      'beach_authority',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.bulkUpdate(
      'roles',
      { globalAccess: true },
      { id: getId('SuperAdmin') },
    );

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_manager'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_manager'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('safety_officer'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regular_user'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('CREATE_BEACH_AUTHORITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('READ_BEACH_AUTHORITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('UPDATE_BEACH_AUTHORITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('DELETE_BEACH_AUTHORITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('CREATE_BEACH_AUTHORITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('READ_BEACH_AUTHORITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('UPDATE_BEACH_AUTHORITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('DELETE_BEACH_AUTHORITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_manager'),
        permissionId: getId('READ_BEACH_AUTHORITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_manager'),
        permissionId: getId('UPDATE_BEACH_AUTHORITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('safety_officer'),
        permissionId: getId('READ_BEACH_AUTHORITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regular_user'),
        permissionId: getId('READ_BEACH_AUTHORITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('CREATE_BEACHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('READ_BEACHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('UPDATE_BEACHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('DELETE_BEACHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('CREATE_BEACHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('READ_BEACHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('UPDATE_BEACHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('DELETE_BEACHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_manager'),
        permissionId: getId('CREATE_BEACHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_manager'),
        permissionId: getId('READ_BEACHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_manager'),
        permissionId: getId('UPDATE_BEACHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('safety_officer'),
        permissionId: getId('READ_BEACHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('safety_officer'),
        permissionId: getId('UPDATE_BEACHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regular_user'),
        permissionId: getId('READ_BEACHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_manager'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_manager'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_manager'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_manager'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('safety_officer'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('safety_officer'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('safety_officer'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('safety_officer'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regular_user'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('CREATE_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('READ_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('UPDATE_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('DELETE_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('CREATE_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('READ_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('UPDATE_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('DELETE_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_manager'),
        permissionId: getId('CREATE_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_manager'),
        permissionId: getId('READ_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_manager'),
        permissionId: getId('UPDATE_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_manager'),
        permissionId: getId('DELETE_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('safety_officer'),
        permissionId: getId('READ_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('safety_officer'),
        permissionId: getId('UPDATE_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regular_user'),
        permissionId: getId('READ_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regular_user'),
        permissionId: getId('UPDATE_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_supervisor'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regional_manager'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('beach_manager'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('safety_officer'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('regular_user'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_BEACH_AUTHORITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_BEACH_AUTHORITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_BEACH_AUTHORITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_BEACH_AUTHORITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_BEACHES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_BEACHES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_BEACHES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_BEACHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_REVIEWS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_REVIEWS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_REVIEWS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_BEACH_AUTHORITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_BEACH_AUTHORITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_BEACH_AUTHORITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_BEACH_AUTHORITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_BEACHES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_BEACHES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_BEACHES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_BEACHES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_NOTIFICATIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_NOTIFICATIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_REVIEWS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_REVIEWS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_REVIEWS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_REVIEWS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_BEACH_AUTHORITY'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_BEACH_AUTHORITY'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_BEACH_AUTHORITY'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_BEACH_AUTHORITY'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'beach_supervisor',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'regional_manager',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
