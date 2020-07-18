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
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

//videoRouter.get(routes.videos, (req, res) => res.send("Videos"));
// Upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo ,postUpload);

//Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;