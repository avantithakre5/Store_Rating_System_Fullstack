const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { authorize, authorizeStoreOwner } = require('../middleware/rbac');
const {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
  getMyStores,
  storeValidation
} = require('../controllers/storeController');

// Public routes
router.get('/', getAllStores);
router.get('/:id', getStoreById);

// Protected routes - Store owners and admins
router.get('/my/stores', authenticate, authorize('store_owner', 'admin'), getMyStores);
router.post('/', authenticate, authorize('store_owner', 'admin'), storeValidation, createStore);
router.put('/:id', authenticate, authorizeStoreOwner, storeValidation, updateStore);
router.delete('/:id', authenticate, authorizeStoreOwner, deleteStore);

module.exports = router;
