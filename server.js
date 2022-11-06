import 'express-async-errors';

import config from './config.js';
import createApp from './app.js';
import { sequelize } from './db/database.js';

export const startServer = async port => {
  const app = createApp();
  const SYNC = JSON.parse(config.sync);

  await sequelize.sync({ force: SYNC });

  const server = app.listen(port, () => {
    console.log(`server start PORT:${port}`);
  });
  return server;
};
export const stopServer = async server => {
  return new Promise((resolve, reject) => {
    server.close(async () => {
      try {
        await sequelize.close();
        resolve();
      } catch (error) {
        reject();
      }
    });
  });
};
