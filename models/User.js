import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"

const UserScheme = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    facebookId: Number,
    githubId: Number
});

UserScheme.plugin(passportLocalMongoose, {usernameField: "email"});



const model = mongoose.model("User", UserScheme);
export default model;