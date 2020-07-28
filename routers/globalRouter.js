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

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getlogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home)
globalRouter.get(routes.logout, logout)
globalRouter.get(routes.search, search)

export default globalRouter;