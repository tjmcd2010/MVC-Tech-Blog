const Blogger = require('./Blogger');
const Blog = require('./Blog');

Blogger.hasMany(Blog, {
  foreignKey: 'blogger_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(Blogger, {
  foreignKey: 'blogger_id'
});

module.exports = { Blogger, Blog };
