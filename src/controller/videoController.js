import routes from "../routes"
import Video from "../models/Video";
import userRouter from "../routers/userRouter";
import Comment from "../models/Comment"

export const home = async (req,res) => {    
    try{
        const videos = await Video.find({}).sort({
            _id : -1
        });
        res.render("home", { pageTitle:'Home', videos });
    } catch(error){
        console.log(error);
        res.render("home", {pageTitle: "Home", videos:[]});
    }
}
export const search = async (req, res) => {
    const {
        query: {term: searchingBy}
    } = req;

    let videos = [];
    try{
        videos = await Video.find({
            title: {$regex: searchingBy, $options:"i"}
        });
    } catch(error){
        console.log(error)
    }
    res.render("search", { pageTitle:'Search', searchingBy, videos});
}

export const getUpload = (req, res) => {
    res.render("upload",{ pageTitle:'Upload'});
}
export const postUpload = async (req, res) => {
    const {
        body:{  title, description  },
        file:{  location    }
    } = req;

    console.log(req);

    const newVideo = await Video.create({
        fileUrl: location,
        title,
        description,
        creator: req.user.id
    })
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
    //To Do: Upload and save Video
    //res.redirect(routes.videoDetail(121212))
}
export const videoDetail = async (req, res) => {
    const{
        params:{id}
    } = req;

    try{
        const video = await Video.findById(id)
        .populate("creator")
        .populate("comments");
        res.render("videoDetail", { pageTitle: video.title , video});
    } catch(error){
        res.redirect(routes.home);
    }
}
export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    } = req;    

    try{
        const video = await Video.findById(id);       

        if (video.creator == req.user.id){
            res.render("editVideo", {pageTitle:`Edit ${video.title}`, video})
        } else{
            throw Error();
        }
        
        // if(video.creator !== req.user.id){
        //     console.log(video.creator);
        //     console.log(req.user.id);
        //     throw Error();            
        //     return;
        // }else{
            
        // }        
    } catch(error){        
        res.redirect(routes.home);
    }
}

export const postEditVideo = async (req, res) => {
    const{
        params: {id},
        body: {title, description}
    } = req;
    try{
        await Video.findOneAndUpdate({ _id: id }, {title, description});
        res.redirect(routes.videoDetail(id));
    } catch(error){
        res.redirect(routes.home);
    }

}

export const deleteVideo = async (req, res) => {
    const{
        params:{id}
    } = req;

    try{
        const video = await Video.findById(id);
        if(video.creator != req.user.id){
            throw Error();
            return;
        }else{
            await Video.findByIdAndRemove({_id:id});
        }                
    } catch (error){
        console.log(error);
    }
    res.redirect(routes.home)
    //res.render("deleteVideo", { pageTitle:'Delete Video'});

}

export const postRegisterView = async (req, res) => {
    const{
        params: {id}
    } = req;

    

    try{
        const video = await Video.findById(id)
        video.views += 1;
        video.save();
        res.status(200);
    } catch(error){
        res.status(400);
        res.end();
    } finally{
        res.end();
    }
}

export const postAddComment = async(req, res) => {
    const {
        params: {id},
        body: {comment},
        user
    } = req;

    console.log(req);

    try{
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            creator: user.id
        });
        video.comments.push(newComment.id);
        console.log(newComment.id);
        video.save();
        res.status(200);
        res.redirect(routes.videoDetail(id));
    } catch(error){
        res.status(400);
    } finally {
        res.end();
    }
}

export const postRemoveComment = async (req, res) => {

    console.log(req);
    
    const {
        params: {id},
        body: { commentId }
    } = req;

    
    
    try {
        await Comment.remove({ _id : commentId });
        const video = await Video.findById(id)        
        video.comments.pull(commentId);
        video.save();
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.end();
    }
}