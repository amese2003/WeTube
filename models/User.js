import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"

const UserScheme = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    facebookId: Number,
    githubId: Number,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    videos:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ]
});

UserScheme.plugin(passportLocalMongoose, {usernameField: "email"});



const model = mongoose.model("User", UserScheme);
export default model;