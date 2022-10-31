import 'express-async-errors';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

dotenv.config();

const createApp = () => {
  const app = express();
  const corsOption = {
    origin: '*',
  };

  app.use(cors(corsOption));
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(routes);
  // Error Middleware

  return app;
};

export default createApp;
