import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
});

export const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

/**
 * Middleware factory to validate request body using a Zod schema
 * @param {z.ZodSchema} schema 
 */
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const formattedErrors = result.error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message
    }));

    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: formattedErrors
      }
    });
  }
  
  // Replace req.body with parsed/sanitized data
  req.body = result.data;
  next();
};

export default {
  signupSchema,
  loginSchema,
  validate
};
