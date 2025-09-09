// Rate limiting middleware for authentication endpoints

const rateLimitMap = new Map();

export const authRateLimit = (windowMs = 15 * 60 * 1000, maxAttempts = 5) => {
  return (req, res, next) => {
    const clientId = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!rateLimitMap.has(clientId)) {
      rateLimitMap.set(clientId, {
        attempts: 1,
        firstAttempt: now,
        lastAttempt: now
      });
      return next();
    }
    
    const clientData = rateLimitMap.get(clientId);
    
    // Reset if window has passed
    if (now - clientData.firstAttempt > windowMs) {
      rateLimitMap.set(clientId, {
        attempts: 1,
        firstAttempt: now,
        lastAttempt: now
      });
      return next();
    }
    
    // Check if max attempts exceeded
    if (clientData.attempts >= maxAttempts) {
      const timeLeft = Math.ceil((windowMs - (now - clientData.firstAttempt)) / 1000);
      return res.status(429).json({
        success: false,
        message: `Too many login attempts. Please try again in ${timeLeft} seconds.`,
        retryAfter: timeLeft
      });
    }
    
    // Increment attempts
    clientData.attempts++;
    clientData.lastAttempt = now;
    rateLimitMap.set(clientId, clientData);
    
    next();
  };
};

export const resetRateLimit = (req) => {
  const clientId = req.ip || req.connection.remoteAddress;
  rateLimitMap.delete(clientId);
};

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  
  for (const [clientId, data] of rateLimitMap.entries()) {
    if (now - data.firstAttempt > windowMs) {
      rateLimitMap.delete(clientId);
    }
  }
}, 5 * 60 * 1000); // Clean up every 5 minutes
