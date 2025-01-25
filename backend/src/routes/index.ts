import { Router } from 'express';
import { quotesRouter } from './quote.router';

const router = Router();

// Mount each route module
router.use('/quotes', quotesRouter);

export default router;