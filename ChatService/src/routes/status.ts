import express from 'express';
import { handleCreateChat } from '../handlers/status/create';

const router  = express.Router();


router.post('/create',handleCreateChat);


export const statusUpdateRoute = router 