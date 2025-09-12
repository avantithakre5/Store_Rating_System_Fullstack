const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const {
  getDashboardStats,
  getAllUsers,
  getAllStoresAdmin,
  updateUserStatus,
  updateStoreStatus
} = require('../controllers/adminController');

// All admin routes require admin role
router.use(authenticate, authorize('admin'));

// Dashboard and statistics
router.get('/dashboard', getDashboardStats);

// User management
router.get('/users', getAllUsers);
router.patch('/users/:userId/status', updateUserStatus);

// Store management
router.get('/stores', getAllStoresAdmin);
router.patch('/stores/:storeId/status', updateStoreStatus);

module.exports = router;
