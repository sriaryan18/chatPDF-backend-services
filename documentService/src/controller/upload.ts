import express, {Request,Response} from 'express';
import handleUplaod from '../service/upload'
const router = express.Router();

router.get('/',handleUplaod)
export default router;