import express from 'express';
import upload from './controller/upload'
const app = express();

app.use('/upload',upload);

const port = process.env.PORT
app.listen(port,() => console.log('app started'))