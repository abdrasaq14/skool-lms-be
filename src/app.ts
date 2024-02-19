 import express, {
   type Request,
   type Response,
   type NextFunction,
 } from "express";
 import createError from "http-errors";
 import dotenv from "dotenv";
 import path from 'path';
 import cookieParser from 'cookie-parser';
 import logger from 'morgan';
 import 'reflect-metadata';
 import { AppDataSource } from './database/data-source';

 import indexRouter from './routes/index';
 import usersRouter from './routes/users';

dotenv.config();

// Database Connection
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the PostgresSql database succefully");
  })
  .catch((error) => console.log(error));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../", 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
