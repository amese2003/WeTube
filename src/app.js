import "@babel/polyfill";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import flash from "express-flash"
import MongoStore from "connect-mongo";
import { localMiddleware } from "./middlewares";
import userRouter  from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";

import "./passport";

const CookieStore = MongoStore(session)

const app = express();

const PORT = 4000;

app.use(helmet());
app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"));
//app.use("/uploads", express.static("uploads"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: true,
      saveUninitialized: false,
      store: new CookieStore({ mongooseConnection : mongoose.connection})
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// app.use((req, res, next) => {


// })


// app.use(function(req, res, next) {


// })

// const localMiddleware = (req,res,next) => {

// }


app.use(localMiddleware);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;