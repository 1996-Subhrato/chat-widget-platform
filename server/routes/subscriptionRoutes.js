import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { validate, selectPlanSchema } from '../validators/subscriptionValidator.js';
import {
  selectPlan,
  getCurrentSubscription,
  getApiKey
} from '../controllers/subscriptionController.js';

const router = express.Router();

// POST /api/subscription/select - Select a plan & generate API key
router.post('/select', authMiddleware, validate(selectPlanSchema), selectPlan);

// GET /api/subscription/current - Fetch current user subscription
router.get('/current', authMiddleware, getCurrentSubscription);

// GET /api/subscription/api-key - Fetch active API key
router.get('/api-key', authMiddleware, getApiKey);

export default router;
