const Owner = require('./Owner');
const Blog = require('./Blog');

Owner.hasMany(Blog, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(Owner, {
  foreignKey: 'owner_id'
})

module.exports = { Owner,Blog };
