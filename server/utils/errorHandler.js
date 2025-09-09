// Comprehensive error handling utilities for authentication and database operations

export class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleMongoError = (error) => {
  let message = 'An unexpected error occurred';
  let statusCode = 500;

  if (error.code === 11000) {
    // Duplicate key error
    const field = Object.keys(error.keyPattern)[0];
    const value = error.keyValue[field];
    
    if (field === 'username') {
      message = `Username '${value}' is already taken. Please choose a different username.`;
    } else if (field === 'email') {
      message = `Email '${value}' is already registered. Please use a different email or try logging in.`;
    } else {
      message = `This ${field} is already in use. Please choose a different value.`;
    }
    statusCode = 409; // Conflict
  } else if (error.name === 'ValidationError') {
    // Mongoose validation error
    const errors = Object.values(error.errors).map(err => err.message);
    message = `Validation failed: ${errors.join(', ')}`;
    statusCode = 400;
  } else if (error.name === 'CastError') {
    message = 'Invalid data format provided';
    statusCode = 400;
  } else if (error.name === 'JsonWebTokenError') {
    message = 'Invalid authentication token';
    statusCode = 401;
  } else if (error.name === 'TokenExpiredError') {
    message = 'Authentication token has expired. Please log in again.';
    statusCode = 401;
  }

  return { message, statusCode };
};

export const handleAsyncError = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    timestamp: new Date().toISOString()
  });

  // Handle specific error types
  if (err.code === 11000) {
    const handled = handleMongoError(err);
    error.message = handled.message;
    error.statusCode = handled.statusCode;
  }

  // Default error response
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export const createErrorResponse = (message, statusCode = 400) => {
  return {
    success: false,
    message,
    statusCode
  };
};

export const createSuccessResponse = (message, data = null) => {
  return {
    success: true,
    message,
    ...(data && { data })
  };
};
