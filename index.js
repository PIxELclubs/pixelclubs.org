import express from 'express';
import {join} from 'path';
import {createServer} from 'http';
import sass from 'node-sass-middleware';

export const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use('/styles', sass({
  src: join(__dirname, 'sass'),
  dest: join(__dirname, 'out'),
  outputStyle: 'compressed'
}));

app.use('/styles', express.static('out'));

app.get('/', (req, res, next) => {
  res.render('index.pug', {
    dev: process.env.NODE_ENV === 'development'
  });
});

export const server = createServer(app);

server.listen(8000, () => {
  console.log(`Listening at port ${8000}`);
});
