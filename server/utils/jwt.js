import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'chat_widget_platform_jwt_secret_dev_key_2026';
const JWT_EXPIRES_IN = '7d';

/**
 * Generate JWT token for an authenticated user
 * @param {Object} user - User object containing id and email
 * @returns {string} Signed JWT token
 */
export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

/**
 * Verify JWT token
 * @param {string} token - Signed JWT token
 * @returns {Object} Decoded payload if valid
 */
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export default {
  generateToken,
  verifyToken
};
