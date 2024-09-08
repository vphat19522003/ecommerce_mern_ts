import bodyParser from 'body-parser';
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
app.use(morgan('combined', { stream: createLogFile(__dirname) }));
app.use(bodyParser.urlencoded({ extended: true }));

//Connect database
connectDB();

//route handlers
app.use('', router);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});
