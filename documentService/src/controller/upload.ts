import express, {Request,Response} from 'express';
import {handleUpload as handleUpload,handleStatusUpdate} from '../service/upload'
const router = express.Router();

router.get('/',handleUpload);
router.post('upload',handleStatusUpdate)
export default router;