import express from 'express';
import upload from './controller/upload'
import { authenticateRequest } from './middlewares/userMiddleware';


const app = express();

app.use(authenticateRequest)
app.use('/upload',upload);

const port = process.env.PORT
app.listen(port,() => console.log('app started'))