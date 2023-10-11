import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

import cookieParser from 'cookie-parser';
import { BookRoutes } from './modules/Book/book.route';
import { CategoryRoutes } from './modules/Category/category.route';
import { OrderRoutes } from './modules/Order/order.route';
import { authRoutes } from './modules/auth/auth.route';
import { UserRoutes } from './modules/user/user.route';

const app: Application = express();

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', authRoutes);
app.use('/api/v1', UserRoutes);
app.use('/api/v1', CategoryRoutes);
app.use('/api/v1', BookRoutes);
app.use('/api/v1', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Book Catalog Server 📚!');
});
//global error handler
app.use(globalErrorHandler);

export default app;
