import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import connectDB from './db/connectDB';
import errorHandler from './middleware/error.middleware';
import router from './routes';
import { createLogFile } from './utils/createLogFile';

config();

//create express
const app = express();

//middlewares
app.use(
  cors({
    origin: 'http://localhost:3033', // URL frontend
    credentials: true
  })
);

app.use(morgan('combined', { stream: createLogFile(__dirname) }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//Connect database
connectDB();

//route handlers
app.use('/api', router);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});
