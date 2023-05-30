import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
 res.render('home');
});

app.get('/login', (req: Request, res: Response) => {
  res.render('login');
});

app.get('/register', (req: Request, res: Response) => {
  res.render('register');
});

app.listen(3000, () => {
  console.log('Server is running');
});