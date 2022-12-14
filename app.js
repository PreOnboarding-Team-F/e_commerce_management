import 'express-async-errors';

import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import { exceptionErrorHandler } from './middleware/globalErrorHandler.js';
import express from 'express';
import morgan from 'morgan';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import routes from './route/index.js';

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
  app.use(notFoundHandler);
  app.use(exceptionErrorHandler);
  app.use(errorHandler);
  return app;
};

export default createApp;
