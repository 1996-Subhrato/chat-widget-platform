import { z } from 'zod';

export const selectPlanSchema = z.object({
  planType: z.enum(['trial', 'basic', 'pro'], {
    required_error: 'planType is required',
    invalid_type_error: 'Invalid planType. Must be one of: trial, basic, pro'
  })
});

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation error',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        }
      });
    }
    next(error);
  }
};
