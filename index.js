import express from 'express';
import {join} from 'path';
import sass from 'node-sass-middleware';

const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use('/styles', sass({
  src: join(__dirname, 'sass'),
  dest: join(__dirname, 'out'),
  outputStyle: 'compressed'
}));

app.use('/styles', express.static('out'));

app.get('/', (req, res, next) => {
  res.render('index.pug');
});

app.listen(8080, () => {
  console.log(`Listening at port 8000`);
});
