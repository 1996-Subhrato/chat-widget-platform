import { verifyToken } from '../utils/jwt.js';
import { User } from '../models/index.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        error: {
          code: 'UNAUTHENTICATED',
          message: 'Authentication required'
        }
      });
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      return res.status(401).json({
        error: {
          code: 'UNAUTHENTICATED',
          message: 'Authentication required'
        }
      });
    }

    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'name', 'email']
    });

    if (!user) {
      return res.status(401).json({
        error: {
          code: 'UNAUTHENTICATED',
          message: 'Authentication required'
        }
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('[Auth Middleware Error]:', error.message);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected authentication error occurred'
      }
    });
  }
};

export default authMiddleware;
