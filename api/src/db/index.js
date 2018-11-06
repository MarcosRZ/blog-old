/* eslint-disable no-console */
import colors from 'colors';
import mongoose from 'mongoose';
import config from './config/mongo';

export default {
  start: async ({ debug } = {}) =>
    new Promise((resolve, reject) => {
      const mongoUrl = config.MONGO_URL;

      mongoose.Promise = global.Promise;
      mongoose.set('debug', debug);

      try {
        mongoose.connect(mongoUrl);
      } catch (err) {
        mongoose.createConnection(mongoUrl);
      }

      mongoose.connection
        .once('open', () => {
          console.log(colors.blue('🍃  Connected to MongoDB'));
          resolve(true);
        })
        .on('error', (e) => {
          reject(e);
        });
    }),
};
