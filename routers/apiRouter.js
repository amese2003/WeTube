import express from "express";
import routes from "../routes";
import { postRegisterView, postAddComment, postRemoveComment } from "../controller/videoController";
import { onlyPrivate } from "../middlewares"

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);

apiRouter.post(routes.deleteComment, onlyPrivate ,postRemoveComment);

export default apiRouter;