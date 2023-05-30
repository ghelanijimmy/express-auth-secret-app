import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import loginRouter from './routes/login';
import registerRouter from './routes/register';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.get('/', async (req: Request, res: Response) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log('Server is running');
});
