import express from 'express';
import { signup, login, logout, me } from '../controllers/authController.js';
import { validate, signupSchema, loginSchema } from '../validators/authValidator.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/auth/signup - Register new user
router.post('/signup', validate(signupSchema), signup);

// POST /api/auth/login - Authenticate user
router.post('/login', validate(loginSchema), login);

// POST /api/auth/logout - Terminate session
router.post('/logout', logout);

// GET /api/auth/me - Retrieve current user info
router.get('/me', authMiddleware, me);

export default router;
