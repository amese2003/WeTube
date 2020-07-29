import express from "express";
import passport from "passport";
import routes from "../routes";
import { search, home } from "../controller/videoController";
import { 
    getJoin,
    postJoin,
    postLogin,
    getlogin,
    githubLogin,
    logout,
    postGithubLogIn
} from "../controller/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";


const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic ,getJoin);
globalRouter.post(routes.join, onlyPublic ,postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic ,getlogin);
globalRouter.post(routes.login, onlyPublic ,postLogin);

globalRouter.get(routes.home, home)
globalRouter.get(routes.logout, onlyPrivate ,logout)
globalRouter.get(routes.search, search)


globalRouter.get(routes.github, githubLogin);
globalRouter.get(
    routes.githubCallback, 
    passport.authenticate("github", {failureRedirect: "/login"}),
    postGithubLogIn
);


export default globalRouter;