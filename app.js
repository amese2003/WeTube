import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localMiddleware } from "./middlewares";
import userRouter  from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";


const app = express();

const PORT = 4000;

app.use(helmet());
app.set("view engine", "pug")
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

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


export default app;