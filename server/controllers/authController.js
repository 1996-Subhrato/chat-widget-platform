import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import { generateToken } from '../utils/jwt.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

/**
 * Register a new user
 * POST /api/auth/signup
 */
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    // Check for existing user with the same email
    const existingUser = await User.findOne({ where: { email: normalizedEmail } });
    if (existingUser) {
      return res.status(400).json({
        error: {
          code: 'EMAIL_ALREADY_EXISTS',
          message: 'An account with this email address already exists'
        }
      });
    }

    // Hash password with bcrypt
    const password_hash = await bcrypt.hash(password, 10);

    // Create user record
    const user = await User.create({
      name,
      email: normalizedEmail,
      password_hash
    });

    // Do NOT auto-login after signup
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('[Signup Error]:', error.message);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while creating your account'
      }
    });
  }
};

/**
 * Authenticate user & set JWT cookie
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    // Verify user existence
    const user = await User.findOne({ where: { email: normalizedEmail } });
    if (!user) {
      return res.status(401).json({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      });
    }

    // Verify password hash
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Set HttpOnly cookie
    res.cookie('token', token, COOKIE_OPTIONS);

    // Return user details without exposing sensitive data
    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('[Login Error]:', error.message);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred during authentication'
      }
    });
  }
};

/**
 * Logout user & clear cookie
 * POST /api/auth/logout
 */
export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: COOKIE_OPTIONS.httpOnly,
      secure: COOKIE_OPTIONS.secure,
      sameSite: COOKIE_OPTIONS.sameSite
    });

    return res.status(200).json({
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('[Logout Error]:', error.message);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred during logout'
      }
    });
  }
};

/**
 * Get current authenticated user details
 * GET /api/auth/me
 */
export const me = async (req, res) => {
  try {
    return res.status(200).json({
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      }
    });
  } catch (error) {
    console.error('[Me Endpoint Error]:', error.message);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while fetching user profile'
      }
    });
  }
};

export default {
  signup,
  login,
  logout,
  me
};
