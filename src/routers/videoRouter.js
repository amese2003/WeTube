import express from "express";
import routes from "../routes";
import{
    home,
    search,
    videoDetail,
    getEditVideo,
    postEditVideo,
    deleteVideo,
    getUpload,
    postUpload
} from "../controller/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

//videoRouter.get(routes.videos, (req, res) => res.send("Videos"));
// Upload
videoRouter.get(routes.upload, onlyPrivate ,getUpload);
videoRouter.post(routes.upload, onlyPrivate ,uploadVideo ,postUpload);

//Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate ,getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate ,postEditVideo);

videoRouter.get(routes.deleteVideo(),onlyPrivate, deleteVideo);

export default videoRouter;