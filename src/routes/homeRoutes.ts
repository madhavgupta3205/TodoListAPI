import { Router } from 'express';
import { home } from '../controllers/homeController';

const router = Router();

router.get('/', home); // Home route

export default router;