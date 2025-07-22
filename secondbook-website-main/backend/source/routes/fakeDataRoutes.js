// backend/source/routes/fakeDataRoutes.js
import express from 'express';
import { generateFakeData } from '../controllers/fakeData.controller.js';

const router = express.Router();

router.get('/', generateFakeData);

export default router;
