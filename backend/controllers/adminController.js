const { User, Store, Rating } = require('../models');
const { Op } = require('sequelize');

const getDashboardStats = async (req, res) => {
  try {
    // Basic counts
    const totalUsers = await User.count({ where: { is_active: true } });
    const totalStores = await Store.count({ where: { is_active: true } });
    const totalRatings = await Rating.count();
    
    // User role distribution
    const userRoles = await User.findAll({
      attributes: [
        'role',
        [User.sequelize.fn('COUNT', User.sequelize.col('role')), 'count']
      ],
      where: { is_active: true },
      group: ['role'],
      raw: true
    });

    // Top rated stores
    const topStores = await Store.findAll({
      where: { is_active: true },
      order: [['average_rating', 'DESC'], ['total_ratings', 'DESC']],
      limit: 10,
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['first_name', 'last_name', 'email']
        }
      ]
    });

    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentStats = await Rating.findAll({
      attributes: [
        [Rating.sequelize.fn('DATE', Rating.sequelize.col('created_at')), 'date'],
        [Rating.sequelize.fn('COUNT', Rating.sequelize.col('id')), 'count']
      ],
      where: {
        created_at: {
          [Op.gte]: thirtyDaysAgo
        }
      },
      group: [Rating.sequelize.fn('DATE', Rating.sequelize.col('created_at'))],
      order: [[Rating.sequelize.fn('DATE', Rating.sequelize.col('created_at')), 'DESC']],
      raw: true
    });

    // Category distribution
    const categoryStats = await Store.findAll({
      attributes: [
        'category',
        [Store.sequelize.fn('COUNT', Store.sequelize.col('category')), 'count'],
        [Store.sequelize.fn('AVG', Store.sequelize.col('average_rating')), 'avg_rating']
      ],
      where: { is_active: true },
      group: ['category'],
      order: [[Store.sequelize.fn('COUNT', Store.sequelize.col('category')), 'DESC']],
      raw: true
    });

    res.json({
      overview: {
        totalUsers,
        totalStores,
        totalRatings,
        averageRating: await Rating.aggregate('rating', 'avg') || 0
      },
      userRoles,
      topStores,
      recentActivity: recentStats,
      categoryStats
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch dashboard statistics',
      message: error.message
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    const offset = (page - 1) * limit;
    
    const where = {};
    
    if (role) {
      where.role = role;
    }
    
    if (search) {
      where[Op.or] = [
        { first_name: { [Op.iLike]: `%${search}%` } },
        { last_name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const users = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [['created_at', 'DESC']]
    });

    res.json({
      users: users.rows,
      pagination: {
        total: users.count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(users.count / limit)
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      error: 'Failed to fetch users',
      message: error.message
    });
  }
};

const getAllStoresAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, city, search } = req.query;
    const offset = (page - 1) * limit;
    
    const where = {};
    
    if (category) {
      where.category = category;
    }
    
    if (city) {
      where.city = { [Op.iLike]: `%${city}%` };
    }
    
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const stores = await Store.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['first_name', 'last_name', 'email']
        }
      ],
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [['created_at', 'DESC']]
    });

    res.json({
      stores: stores.rows,
      pagination: {
        total: stores.count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(stores.count / limit)
      }
    });
  } catch (error) {
    console.error('Get all stores admin error:', error);
    res.status(500).json({
      error: 'Failed to fetch stores',
      message: error.message
    });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { is_active } = req.body;
    
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }
    
    await user.update({ is_active });
    
    res.json({
      message: `User ${is_active ? 'activated' : 'deactivated'} successfully`,
      user
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      error: 'Failed to update user status',
      message: error.message
    });
  }
};

const updateStoreStatus = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { is_active } = req.body;
    
    const store = await Store.findByPk(storeId);
    
    if (!store) {
      return res.status(404).json({
        error: 'Store not found'
      });
    }
    
    await store.update({ is_active });
    
    res.json({
      message: `Store ${is_active ? 'activated' : 'deactivated'} successfully`,
      store
    });
  } catch (error) {
    console.error('Update store status error:', error);
    res.status(500).json({
      error: 'Failed to update store status',
      message: error.message
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllStoresAdmin,
  updateUserStatus,
  updateStoreStatus
};
