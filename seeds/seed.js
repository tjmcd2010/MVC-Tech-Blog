const sequelize = require('../config/connection');
const { Owner, Blog } = require('../models');

const ownerData = require('./ownerData.json');
const blogData = require('./blogData.json');
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const owners = await Owner.bulkCreate(ownerData, {
    individualHooks: true,
    returning: true,
  });

  for (const blogs of blogData) {
    await Blog.create({
      ...blogs,
      owner_id: owners[Math.floor(Math.random() * owners.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();