import express from 'express';
import { handleNewQuery } from '../handlers/query/newQuery';
import { getAllQueries, getQueryById } from '../handlers/query/getAllQuery';

const router = express.Router();

router.post('/',handleNewQuery);
router.get('/getAllChats',getAllQueries);
router.get('/getChatById/:id',getQueryById);


export const queryRouter = router;