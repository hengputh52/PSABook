// backend/source/routes/fakeDataRoutes.js
import express from 'express';
import { generateFakeData } from '../controllers/fakeData.controller.js';

const router = express.Router();

// Middleware to check if fake data generation is allowed
const checkDevelopmentMode = (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({
      error: 'Fake data generation is disabled in production',
      message: 'This endpoint is only available in development environment'
    });
  }
  next();
};

// Apply development check to all fake data routes
router.use(checkDevelopmentMode);

router.get('/', generateFakeData);

export default router;
