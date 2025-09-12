const { body, validationResult } = require('express-validator');
const { Store, User, Rating } = require('../models');
const { Op } = require('sequelize');

const getAllStores = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, city, search } = req.query;
    const offset = (page - 1) * limit;
    
    const where = { is_active: true };
    
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
      order: [['average_rating', 'DESC'], ['created_at', 'DESC']]
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
    console.error('Get all stores error:', error);
    res.status(500).json({
      error: 'Failed to fetch stores',
      message: error.message
    });
  }
};

const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const store = await Store.findByPk(id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['first_name', 'last_name', 'email', 'phone']
        },
        {
          model: Rating,
          as: 'ratings',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['first_name', 'last_name']
            }
          ]
        }
      ]
    });

    if (!store || !store.is_active) {
      return res.status(404).json({
        error: 'Store not found'
      });
    }

    res.json({ store });
  } catch (error) {
    console.error('Get store by ID error:', error);
    res.status(500).json({
      error: 'Failed to fetch store',
      message: error.message
    });
  }
};

const createStore = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const {
      name,
      description,
      address,
      city,
      state,
      zip_code,
      phone,
      email,
      website,
      category
    } = req.body;

    const store = await Store.create({
      name,
      description,
      address,
      city,
      state,
      zip_code,
      phone,
      email,
      website,
      category,
      owner_id: req.user.id
    });

    const storeWithOwner = await Store.findByPk(store.id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['first_name', 'last_name', 'email']
        }
      ]
    });

    res.status(201).json({
      message: 'Store created successfully',
      store: storeWithOwner
    });
  } catch (error) {
    console.error('Create store error:', error);
    res.status(500).json({
      error: 'Failed to create store',
      message: error.message
    });
  }
};

const updateStore = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { id } = req.params;
    const updateData = req.body;

    const store = await Store.findByPk(id);
    
    if (!store) {
      return res.status(404).json({
        error: 'Store not found'
      });
    }

    await store.update(updateData);

    const updatedStore = await Store.findByPk(id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['first_name', 'last_name', 'email']
        }
      ]
    });

    res.json({
      message: 'Store updated successfully',
      store: updatedStore
    });
  } catch (error) {
    console.error('Update store error:', error);
    res.status(500).json({
      error: 'Failed to update store',
      message: error.message
    });
  }
};

const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;
    
    const store = await Store.findByPk(id);
    
    if (!store) {
      return res.status(404).json({
        error: 'Store not found'
      });
    }

    // Soft delete - mark as inactive
    await store.update({ is_active: false });

    res.json({
      message: 'Store deleted successfully'
    });
  } catch (error) {
    console.error('Delete store error:', error);
    res.status(500).json({
      error: 'Failed to delete store',
      message: error.message
    });
  }
};

const getMyStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      where: { owner_id: req.user.id },
      include: [
        {
          model: Rating,
          as: 'ratings'
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({ stores });
  } catch (error) {
    console.error('Get my stores error:', error);
    res.status(500).json({
      error: 'Failed to fetch your stores',
      message: error.message
    });
  }
};

// Validation rules
const storeValidation = [
  body('name').notEmpty().trim(),
  body('address').notEmpty().trim(),
  body('city').notEmpty().trim(),
  body('state').notEmpty().trim(),
  body('category').notEmpty().trim(),
  body('email').optional().isEmail().normalizeEmail(),
  body('website').optional().isURL(),
  body('phone').optional().isMobilePhone(),
  body('zip_code').optional().isLength({ min: 5, max: 10 })
];

module.exports = {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
  getMyStores,
  storeValidation
};
