import crypto from 'crypto';
import { Subscription, ApiKey } from '../models/index.js';

/**
 * Generate a plaintext API key prefixed with `pk_live_`
 */

export const generateApiKeyValue = () => {
  const randomBytes = crypto.randomBytes(16).toString('hex');
  return `pk_live_${randomBytes}`;
};

/**
 * Select / Activate a subscription plan and generate an API key
 */
export const selectPlan = async (userId, planType) => {
  const validPlans = ['trial', 'basic', 'pro'];
  if (!validPlans.includes(planType)) {
    const error = new Error('Invalid plan selected');
    error.code = 'INVALID_PLAN';
    error.statusCode = 400;
    throw error;
  }

  // Check existing subscriptions for user
  const existingSubscription = await Subscription.findOne({ where: { user_id: userId } });

  // 1. Rule for trial: trial can only be activated ONCE per account
  if (planType === 'trial') {
    if (existingSubscription) {
      // If user ever had a trial or currently has an active subscription
      if (existingSubscription.plan_type === 'trial' || existingSubscription.status === 'active') {
        const error = new Error('Trial has already been used on this account');
        error.code = 'TRIAL_ALREADY_USED';
        error.statusCode = 400;
        throw error;
      }
    }
  }

  // 2. Check if user already has an active subscription for the requested plan
  if (existingSubscription && existingSubscription.status === 'active') {
    // Check if trial has expired
    const isTrialExpired = existingSubscription.plan_type === 'trial' &&
      existingSubscription.trial_ends_at &&
      new Date() > new Date(existingSubscription.trial_ends_at);

    if (isTrialExpired) {
      existingSubscription.status = 'expired';
      await existingSubscription.save();
    } else if (existingSubscription.plan_type === planType) {
      const error = new Error(`Subscription for ${planType} plan is already active`);
      error.code = 'SUBSCRIPTION_ALREADY_EXISTS';
      error.statusCode = 400;
      throw error;
    }
  }

  // Prepare subscription dates and status
  const now = new Date();
  let trialStartedAt = null;
  let trialEndsAt = null;

  if (planType === 'trial') {
    trialStartedAt = now;
    trialEndsAt = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days
  }

  let subscription;
  if (existingSubscription) {
    existingSubscription.plan_type = planType;
    existingSubscription.status = 'active';
    existingSubscription.trial_started_at = trialStartedAt;
    existingSubscription.trial_ends_at = trialEndsAt;
    subscription = await existingSubscription.save();
  } else {
    subscription = await Subscription.create({
      user_id: userId,
      plan_type: planType,
      status: 'active',
      trial_started_at: trialStartedAt,
      trial_ends_at: trialEndsAt
    });
  }

  // 3. Automatic API Key Generation
  // Revoke all previous active keys for this user
  await ApiKey.update(
    { revoked: true },
    { where: { user_id: userId, revoked: false } }
  );

  // Generate new plaintext API key
  const apiKeyValue = generateApiKeyValue();
  const keyPrefix = apiKeyValue.substring(0, 12);

  const apiKeyRecord = await ApiKey.create({
    user_id: userId,
    api_key: apiKeyValue,
    key_prefix: keyPrefix,
    revoked: false
  });

  return {
    subscription,
    apiKey: apiKeyRecord.api_key
  };
};

/**
 * Get current active subscription for a user (with automatic trial expiration handling)
 */
export const getCurrentSubscription = async (userId) => {
  const subscription = await Subscription.findOne({ where: { user_id: userId } });
  if (!subscription) {
    return null;
  }

  // Check if trial has expired
  if (subscription.plan_type === 'trial' && subscription.status === 'active' && subscription.trial_ends_at) {
    if (new Date() > new Date(subscription.trial_ends_at)) {
      subscription.status = 'expired';
      await subscription.save();
    }
  }

  return subscription;
};

/**
 * Get active API key for a user
 */
export const getActiveApiKey = async (userId) => {
  const apiKeyRecord = await ApiKey.findOne({
    where: { user_id: userId, revoked: false },
    order: [['created_at', 'DESC']]
  });
  return apiKeyRecord ? apiKeyRecord.api_key : null;
};
