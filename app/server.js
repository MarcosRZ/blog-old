/* eslint no-console: "off" */

import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import Router from './routing/xrouter';
import { APP_NAME, APP_AUTHOR, AUTHOR_GITHUB } from './config/app';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
console.log(`ENV: ${process.env.NODE_ENV}`);
const app = next({ dev });

const logBootInfo = () => {
  console.log('- - - - - - - - - - - - - - - - - - - - -');
  console.log(' ');
  console.log(`${APP_NAME} @ http://localhost:${port}`);
  console.log(' ');
  console.log(`${APP_AUTHOR} | ${AUTHOR_GITHUB}`);
  console.log(' ');
  console.log('- - - - - - - - - - - - - - - - - - - - -');
};

app.prepare().then(() => {
  createServer((req, res) => {
    const target = Router.processRoute(req.url);

    if (target) {
      app.render(req, res, target.target, target.props);
    } else {
      app.getRequestHandler()(req, res, req.url);
    }
  }).listen(port, err => {
    if (err) throw err;
    logBootInfo();
  });
});
