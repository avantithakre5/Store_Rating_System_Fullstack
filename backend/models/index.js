const User = require('./User');
const Store = require('./Store');
const Rating = require('./Rating');

// Define associations
User.hasMany(Store, {
  foreignKey: 'owner_id',
  as: 'ownedStores'
});

Store.belongsTo(User, {
  foreignKey: 'owner_id',
  as: 'owner'
});

User.hasMany(Rating, {
  foreignKey: 'user_id',
  as: 'ratings'
});

Rating.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Store.hasMany(Rating, {
  foreignKey: 'store_id',
  as: 'ratings'
});

Rating.belongsTo(Store, {
  foreignKey: 'store_id',
  as: 'store'
});

module.exports = {
  User,
  Store,
  Rating
};
