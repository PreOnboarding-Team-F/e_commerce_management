import 'express-async-errors';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import routes from './route/index.js';
import { sequelize } from './db/database.js';

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
  sequelize
    .sync({ force: true })
    .then(() => {
      console.log('데이터베이스 연결!');
      app.listen(8080);
    })
    .catch(err => {
      console.error(err);
    });

  return app;
};

export default createApp;
