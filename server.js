import 'express-async-errors';

import createApp from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`server start PORT:${PORT}`);
  });
};
startServer();
