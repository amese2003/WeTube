import routes from "../routes"
import Video from "../models/Video";

export const home = async (req,res) => {    
    try{
        const videos = await Video.find({});
        console.log(videos)
        res.render("home", { pageTitle:'Home', videos });
    } catch(error){
        console.log(error);
        res.render("home", {pageTitle: "Home", videos:[]});
    }
}
export const search = (req, res) => {
    const {
        query: {term: searchingBy}
    } = req;
    res.render("search", { pageTitle:'Search', searchingBy, videos});
}

export const getUpload = (req, res) => {
    res.render("upload",{ pageTitle:'Upload'});
}
export const postUpload = (req, res) => {
    const {
        file,
        titile,
        description
    } = req;
    //To Do: Upload and save Video
    res.redirect(routes.videoDetail(121212))
}
export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle:'VideoDetail'});
export const editVideo = (req, res) => res.render("editVideo", { pageTitle:'Edit Video'});
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle:'Delete Video'});