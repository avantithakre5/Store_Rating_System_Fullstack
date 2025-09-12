const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Access denied. Insufficient permissions.'
      });
    }
    
    next();
  };
};

const authorizeStoreOwner = async (req, res, next) => {
  try {
    const { Store } = require('../models');
    const storeId = req.params.storeId || req.body.storeId;
    
    if (!storeId) {
      return res.status(400).json({
        error: 'Store ID is required'
      });
    }
    
    // Admin can access any store
    if (req.user.role === 'admin') {
      return next();
    }
    
    // Store owner can only access their own stores
    if (req.user.role === 'store_owner') {
      const store = await Store.findByPk(storeId);
      
      if (!store) {
        return res.status(404).json({
          error: 'Store not found'
        });
      }
      
      if (store.owner_id !== req.user.id) {
        return res.status(403).json({
          error: 'Access denied. You can only manage your own stores.'
        });
      }
      
      return next();
    }
    
    return res.status(403).json({
      error: 'Access denied. Insufficient permissions.'
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Error checking store ownership'
    });
  }
};

module.exports = {
  authorize,
  authorizeStoreOwner
};
