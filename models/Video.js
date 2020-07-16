import mongooese from "mongoose"

const VideoSchema = new mongooese.Schema({
    fileUrl:{
        type: String,
        required: "File URL is required"
    },
    title:{
        type: String,
        required: "Title is required"
    },
    description:String,
    views:{
        type: Number,
        default:0
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const model = mongooese.model("Video", VideoSchema);
export default model;