import {parse as urlParse} from 'url';
import * as stop from 'stop';
import {server} from './index.js';

stop.getWebsiteStream([
  `http://localhost:${8000}/`
], {
  filter: currentURL => urlParse(currentURL).hostname === 'localhost',
  parallel: 2
}).syphon(stop.minifyCSS())
  // .syphon(stop.minifyJS())
  .syphon(stop.log())
  .syphon(stop.checkStatusCodes([200]))
  .syphon(stop.writeFileSystem('out'))
  .wait()
  .then(() => {
    console.log('success');
    server.close();
  })
  .catch(err => {
    console.error(err);
    server.close();
  });
