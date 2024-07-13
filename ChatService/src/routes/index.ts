import express from 'express';
import {statusUpdateRoute} from './status'
import {queryRouter} from './query'
const router = express.Router();

router.use('/status',statusUpdateRoute);
router.use('/query',queryRouter);


export const chatRoutes = router;