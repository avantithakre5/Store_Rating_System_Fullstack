const { body, validationResult } = require('express-validator');
const { Rating, Store } = require('../models');

const createRating = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    const { store_id, rating, review, is_anonymous } = req.body;

    // Ensure store exists and is active
    const store = await Store.findByPk(store_id);
    if (!store || !store.is_active) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const newRating = await Rating.create({
      user_id: req.user.id,
      store_id,
      rating,
      review,
      is_anonymous: !!is_anonymous
    });

    // Update store aggregates
    const [results] = await Rating.sequelize.query(
      `SELECT AVG(rating)::numeric(2,1) as avg_rating, COUNT(*) as total
       FROM ratings WHERE store_id = :store_id`,
      { replacements: { store_id }, type: Rating.sequelize.QueryTypes.SELECT }
    );

    await store.update({
      average_rating: results.avg_rating || 0.0,
      total_ratings: results.total || 0
    });

    res.status(201).json({ message: 'Rating submitted', rating: newRating });
  } catch (error) {
    console.error('Create rating error:', error);
    res.status(500).json({ error: 'Failed to submit rating', message: error.message });
  }
};

const updateRating = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    const { id } = req.params;
    const { rating, review, is_anonymous } = req.body;

    const existing = await Rating.findByPk(id);
    if (!existing || existing.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Rating not found' });
    }

    await existing.update({ rating, review, is_anonymous });

    // Update store aggregates
    const [results] = await Rating.sequelize.query(
      `SELECT AVG(rating)::numeric(2,1) as avg_rating, COUNT(*) as total
       FROM ratings WHERE store_id = :store_id`,
      { replacements: { store_id: existing.store_id }, type: Rating.sequelize.QueryTypes.SELECT }
    );

    const store = await Store.findByPk(existing.store_id);
    await store.update({ average_rating: results.avg_rating || 0.0, total_ratings: results.total || 0 });

    res.json({ message: 'Rating updated', rating: existing });
  } catch (error) {
    console.error('Update rating error:', error);
    res.status(500).json({ error: 'Failed to update rating', message: error.message });
  }
};

const deleteRating = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await Rating.findByPk(id);
    if (!existing || existing.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Rating not found' });
    }

    const storeId = existing.store_id;
    await existing.destroy();

    // Update store aggregates
    const [results] = await Rating.sequelize.query(
      `SELECT AVG(rating)::numeric(2,1) as avg_rating, COUNT(*) as total
       FROM ratings WHERE store_id = :store_id`,
      { replacements: { store_id: storeId }, type: Rating.sequelize.QueryTypes.SELECT }
    );

    const store = await Store.findByPk(storeId);
    await store.update({ average_rating: results.avg_rating || 0.0, total_ratings: results.total || 0 });

    res.json({ message: 'Rating deleted' });
  } catch (error) {
    console.error('Delete rating error:', error);
    res.status(500).json({ error: 'Failed to delete rating', message: error.message });
  }
};

// Validation rules
const ratingValidation = [
  body('store_id').notEmpty().isUUID(),
  body('rating').isInt({ min: 1, max: 5 }),
  body('review').optional().isString().trim(),
  body('is_anonymous').optional().isBoolean()
];

const ratingUpdateValidation = [
  body('rating').optional().isInt({ min: 1, max: 5 }),
  body('review').optional().isString().trim(),
  body('is_anonymous').optional().isBoolean()
];

module.exports = {
  createRating,
  updateRating,
  deleteRating,
  ratingValidation,
  ratingUpdateValidation
};
