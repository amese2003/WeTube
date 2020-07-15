import express from "express";
import routes from "../routes";
import { search, home } from "../controller/videoController";
import { getJoin, login, logout, postJoin } from "../controller/userController";

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.home, home)
globalRouter.get(routes.login, login)
globalRouter.get(routes.logout, logout)
globalRouter.get(routes.search, search)

export default globalRouter;