import express from "express";
import routes from "../routes";
import { search, home } from "../controller/videoController";
import { 
    getJoin,
    postJoin,
    postLogin,
    getlogin,
    logout
} from "../controller/userController";
import { onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic ,getJoin);
globalRouter.post(routes.join, onlyPublic ,postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic ,getlogin);
globalRouter.post(routes.login, onlyPublic ,postLogin);

globalRouter.get(routes.home, home)
globalRouter.get(routes.logout, onlyPublic ,logout)
globalRouter.get(routes.search, search)

export default globalRouter;