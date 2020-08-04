import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  getEditProfile,
  changePassword,
  postEditProfile
} from "../controller/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate ,getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.ChangePassword, onlyPrivate ,changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;