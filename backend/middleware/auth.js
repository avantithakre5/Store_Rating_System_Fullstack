const { verifyToken } = require('../utils/jwt');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Access denied. No valid token provided.'
      });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const decoded = verifyToken(token);
    
    const user = await User.findByPk(decoded.id);
    if (!user || !user.is_active) {
      return res.status(401).json({
        error: 'Access denied. User not found or inactive.'
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Access denied. Invalid token.'
    });
  }
};

module.exports = { authenticate };
