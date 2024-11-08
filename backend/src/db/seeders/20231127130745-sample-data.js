const db = require('../models');
const Users = db.users;

const BeachAuthorities = db.beach_authorities;

const Beaches = db.beaches;

const Notifications = db.notifications;

const Reviews = db.reviews;

const BeachAuthority = db.beach_authority;

const BeachAuthoritiesData = [
  {
    name: 'Chennai Beach Authority',

    contact_info: 'contact@chennai-beach-authority.com',

    // type code here for "relation_one" field
  },

  {
    name: 'Mumbai Coastal Management',

    contact_info: 'info@mumbai-coastal.com',

    // type code here for "relation_one" field
  },

  {
    name: 'Goa Beach Committee',

    contact_info: 'support@goa-beach-committee.com',

    // type code here for "relation_one" field
  },
];

const BeachesData = [
  {
    name: 'Marina Beach',

    location: 'Chennai, Tamil Nadu',

    safety_status: 'caution',

    // type code here for "images" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Juhu Beach',

    location: 'Mumbai, Maharashtra',

    safety_status: 'safe',

    // type code here for "images" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Baga Beach',

    location: 'Goa',

    safety_status: 'caution',

    // type code here for "images" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const NotificationsData = [
  {
    message: 'Safety status updated for Marina Beach.',

    sent_at: new Date('2023-10-01T10:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    message: 'New review added for Juhu Beach.',

    sent_at: new Date('2023-10-02T11:30:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    message: 'Weather alert for Baga Beach.',

    sent_at: new Date('2023-10-03T09:15:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const ReviewsData = [
  {
    content: 'Beautiful beach with clean sand and clear water.',

    rating: 5,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    content: 'Crowded but worth visiting for the sunset.',

    rating: 4,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    content: 'Great place for water sports and relaxation.',

    rating: 5,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const BeachAuthorityData = [
  {
    name: 'Galileo Galilei',
  },

  {
    name: 'Jean Piaget',
  },

  {
    name: 'Claude Bernard',
  },
];

// Similar logic for "relation_many"

async function associateUserWithBeach_authority() {
  const relatedBeach_authority0 = await BeachAuthority.findOne({
    offset: Math.floor(Math.random() * (await BeachAuthority.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setBeach_authority) {
    await User0.setBeach_authority(relatedBeach_authority0);
  }

  const relatedBeach_authority1 = await BeachAuthority.findOne({
    offset: Math.floor(Math.random() * (await BeachAuthority.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setBeach_authority) {
    await User1.setBeach_authority(relatedBeach_authority1);
  }

  const relatedBeach_authority2 = await BeachAuthority.findOne({
    offset: Math.floor(Math.random() * (await BeachAuthority.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setBeach_authority) {
    await User2.setBeach_authority(relatedBeach_authority2);
  }
}

async function associateBeachAuthorityWithBeach_authority() {
  const relatedBeach_authority0 = await BeachAuthority.findOne({
    offset: Math.floor(Math.random() * (await BeachAuthority.count())),
  });
  const BeachAuthority0 = await BeachAuthorities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (BeachAuthority0?.setBeach_authority) {
    await BeachAuthority0.setBeach_authority(relatedBeach_authority0);
  }

  const relatedBeach_authority1 = await BeachAuthority.findOne({
    offset: Math.floor(Math.random() * (await BeachAuthority.count())),
  });
  const BeachAuthority1 = await BeachAuthorities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (BeachAuthority1?.setBeach_authority) {
    await BeachAuthority1.setBeach_authority(relatedBeach_authority1);
  }

  const relatedBeach_authority2 = await BeachAuthority.findOne({
    offset: Math.floor(Math.random() * (await BeachAuthority.count())),
  });
  const BeachAuthority2 = await BeachAuthorities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (BeachAuthority2?.setBeach_authority) {
    await BeachAuthority2.setBeach_authority(relatedBeach_authority2);
  }
}

// Similar logic for "relation_many"

async function associateBeachWithBeach_authority() {
  const relatedBeach_authority0 = await BeachAuthorities.findOne({
    offset: Math.floor(Math.random() * (await BeachAuthorities.count())),
  });
  const Beach0 = await Beaches.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Beach0?.setBeach_authority) {
    await Beach0.setBeach_authority(relatedBeach_authority0);
  }

  const relatedBeach_authority1 = await BeachAuthorities.findOne({
    offset: Math.floor(Math.random() * (await BeachAuthorities.count())),
  });
  const Beach1 = await Beaches.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Beach1?.setBeach_authority) {
    await Beach1.setBeach_authority(relatedBeach_authority1);
  }

  const relatedBeach_authority2 = await BeachAuthorities.findOne({
    offset: Math.floor(Math.random() * (await BeachAuthorities.count())),
  });
  const Beach2 = await Beaches.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Beach2?.setBeach_authority) {
    await Beach2.setBeach_authority(relatedBeach_authority2);
  }
}

async function associateNotificationWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification0 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Notification0?.setUser) {
    await Notification0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification1 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Notification1?.setUser) {
    await Notification1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification2 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Notification2?.setUser) {
    await Notification2.setUser(relatedUser2);
  }
}

async function associateNotificationWithBeach_authority() {
  const relatedBeach_authority0 = await BeachAuthority.findOne({
    offset: Math.floor(Math.random() * (await BeachAuthority.count())),
  });
  const Notification0 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Notification0?.setBeach_authority) {
    await Notification0.setBeach_authority(relatedBeach_authority0);
  }

  const relatedBeach_authority1 = await BeachAuthority.findOne({
    offset: Math.floor(Math.random() * (await BeachAuthority.count())),
  });
  const Notification1 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Notification1?.setBeach_authority) {
    await Notification1.setBeach_authority(relatedBeach_authority1);
  }

  const relatedBeach_authority2 = await BeachAuthority.findOne({
    offset: Math.floor(Math.random() * (await BeachAuthority.count())),
  });
  const Notification2 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Notification2?.setBeach_authority) {
    await Notification2.setBeach_authority(relatedBeach_authority2);
  }
}

async function associateReviewWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Review0 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Review0?.setUser) {
    await Review0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Review1 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Review1?.setUser) {
    await Review1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Review2 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Review2?.setUser) {
    await Review2.setUser(relatedUser2);
  }
}

async function associateReviewWithBeach() {
  const relatedBeach0 = await Beaches.findOne({
    offset: Math.floor(Math.random() * (await Beaches.count())),
  });
  const Review0 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Review0?.setBeach) {
    await Review0.setBeach(relatedBeach0);
  }

  const relatedBeach1 = await Beaches.findOne({
    offset: Math.floor(Math.random() * (await Beaches.count())),
  });
  const Review1 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Review1?.setBeach) {
    await Review1.setBeach(relatedBeach1);
  }

  const relatedBeach2 = await Beaches.findOne({
    offset: Math.floor(Math.random() * (await Beaches.count())),
  });
  const Review2 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Review2?.setBeach) {
    await Review2.setBeach(relatedBeach2);
  }
}

async function associateReviewWithBeach_authority() {
  const relatedBeach_authority0 = await BeachAuthority.findOne({
    offset: Math.floor(Math.random() * (await BeachAuthority.count())),
  });
  const Review0 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Review0?.setBeach_authority) {
    await Review0.setBeach_authority(relatedBeach_authority0);
  }

  const relatedBeach_authority1 = await BeachAuthority.findOne({
    offset: Math.floor(Math.random() * (await BeachAuthority.count())),
  });
  const Review1 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Review1?.setBeach_authority) {
    await Review1.setBeach_authority(relatedBeach_authority1);
  }

  const relatedBeach_authority2 = await BeachAuthority.findOne({
    offset: Math.floor(Math.random() * (await BeachAuthority.count())),
  });
  const Review2 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Review2?.setBeach_authority) {
    await Review2.setBeach_authority(relatedBeach_authority2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await BeachAuthorities.bulkCreate(BeachAuthoritiesData);

    await Beaches.bulkCreate(BeachesData);

    await Notifications.bulkCreate(NotificationsData);

    await Reviews.bulkCreate(ReviewsData);

    await BeachAuthority.bulkCreate(BeachAuthorityData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithBeach_authority(),

      await associateBeachAuthorityWithBeach_authority(),

      // Similar logic for "relation_many"

      await associateBeachWithBeach_authority(),

      await associateNotificationWithUser(),

      await associateNotificationWithBeach_authority(),

      await associateReviewWithUser(),

      await associateReviewWithBeach(),

      await associateReviewWithBeach_authority(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('beach_authorities', null, {});

    await queryInterface.bulkDelete('beaches', null, {});

    await queryInterface.bulkDelete('notifications', null, {});

    await queryInterface.bulkDelete('reviews', null, {});

    await queryInterface.bulkDelete('beach_authority', null, {});
  },
};
