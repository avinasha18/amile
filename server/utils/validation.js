// Comprehensive validation utilities for authentication

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validateUsername = (username) => {
  // Username: 3-20 characters, alphanumeric, underscores, hyphens only
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  return usernameRegex.test(username);
};

export const validatePassword = (password) => {
  // Password: 8-50 characters, at least one lowercase, one uppercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,50}$/;
  return passwordRegex.test(password);
};

export const validateRegistrationData = (data) => {
  const errors = [];

  // Email validation
  if (!data.email) {
    errors.push('Email is required');
  } else if (!validateEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }

  // Username validation
  if (!data.username) {
    errors.push('Username is required');
  } else if (!validateUsername(data.username)) {
    errors.push('Username must be 3-20 characters long and contain only letters, numbers, underscores, and hyphens');
  }

  // Name validation
  if (!data.name) {
    errors.push('Name is required');
  } else if (data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  // Password validation
  if (!data.password) {
    errors.push('Password is required');
  } else if (!validatePassword(data.password)) {
    errors.push('Password must be 8-50 characters long and include at least one lowercase letter, one uppercase letter, and one number');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateLoginData = (data) => {
  const errors = [];

  if (!data.username) {
    errors.push('Username is required');
  }

  if (!data.password) {
    errors.push('Password is required');
  }

  if (!data.userType) {
    errors.push('User type is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 255); // Limit length
};
