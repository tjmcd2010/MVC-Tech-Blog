const sequelize = require('../config/connection');
const { Blogger, Blog } = require('../models');

const bloggerData = require('./bloggerData.json');
const blogData = require('./blogData.json');
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const bloggers = await Blogger.bulkCreate(bloggerData, {
    individualHooks: true,
    returning: true,
  });

  for (const blogs of blogData) {
    await Blog.create({
      ...blogs,
      blogger_id: bloggers[Math.floor(Math.random() * bloggers.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();