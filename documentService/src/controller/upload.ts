import express, {Request,Response} from 'express';
import {handleUplaod,handleStatusUpdate} from '../service/upload'
const router = express.Router();

router.get('/',handleUplaod);
router.post('/uplaod-status',handleStatusUpdate)
export default router;