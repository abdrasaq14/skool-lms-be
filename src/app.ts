import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import session from "express-session";
import createError from "http-errors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import cors from "cors";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import { request } from "http";

dotenv.config();

// Database Connection
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the PostgresSql database successfully");
  })
  .catch((error) => console.log(error));

const app = express();
const frontEndUrl = process.env.FRONTEND_URL

app.use(
  session({
    secret: process.env.secret ?? "",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: frontEndUrl,
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({ error: err.message });
  // res.render('error');
});

export default app;
