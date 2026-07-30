import * as subscriptionService from '../services/subscriptionService.js';

/**
 * Select a subscription plan and generate API key
 * POST /api/subscription/select
 */
export const selectPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planType } = req.body;

    const result = await subscriptionService.selectPlan(userId, planType);

    return res.status(200).json({
      subscription: result.subscription,
      apiKey: result.apiKey
    });
  } catch (error) {
    if (error.code && error.statusCode) {
      return res.status(error.statusCode).json({
        error: {
          code: error.code,
          message: error.message
        }
      });
    }

    console.error('[Subscription Select Controller Error]:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to process subscription selection'
      }
    });
  }
};

/**
 * Get current subscription status
 * GET /api/subscription/current
 */
export const getCurrentSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
    const subscription = await subscriptionService.getCurrentSubscription(userId);

    return res.status(200).json({
      subscription
    });
  } catch (error) {
    console.error('[Get Current Subscription Controller Error]:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch current subscription'
      }
    });
  }
};

/**
 * Get active API key for current user
 * GET /api/subscription/api-key
 */
export const getApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const apiKey = await subscriptionService.getActiveApiKey(userId);

    return res.status(200).json({
      apiKey
    });
  } catch (error) {
    console.error('[Get API Key Controller Error]:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch API key'
      }
    });
  }
};
