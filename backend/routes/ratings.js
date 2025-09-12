const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const {
  createRating,
  updateRating,
  deleteRating,
  ratingValidation,
  ratingUpdateValidation
} = require('../controllers/ratingController');

// All rating operations require authentication
router.post('/', authenticate, authorize('user', 'store_owner', 'admin'), ratingValidation, createRating);
router.put('/:id', authenticate, authorize('user', 'store_owner', 'admin'), ratingUpdateValidation, updateRating);
router.delete('/:id', authenticate, authorize('user', 'store_owner', 'admin'), deleteRating);

module.exports = router;
