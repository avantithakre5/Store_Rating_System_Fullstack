const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { Rating, Store, User } = require('../models');

// Get user's ratings
router.get('/my-ratings', authenticate, async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: Store,
          as: 'store',
          attributes: ['id', 'name', 'category', 'city', 'state']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({ ratings });
  } catch (error) {
    console.error('Get user ratings error:', error);
    res.status(500).json({
      error: 'Failed to fetch your ratings',
      message: error.message
    });
  }
});

module.exports = router;
