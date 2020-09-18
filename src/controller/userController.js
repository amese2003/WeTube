import passport from "passport";
import routes from "../routes"
import User from "../models/User"
import userRouter from "../routers/userRouter";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) =>{
    const {
        body: { name, email, password, password2 }
      } = req;

    if(password !== password2){
        req.flash('error', "Passwords don't match");
        res.status(400);
        res.render("join", { pageTitle: "Join" });        
    } else {
        // To Do: Register User
        // To Do: Log User in
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        } catch(error){
            console.log(error);   
            res.redirect(routes.home);        
        }        
    }
}

export const getlogin = (req, res) => {
    res.render("login", {pageTitle:'login'});
}
    
export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home,
    successFlash: "Welcome",
    failureFlash: "can't log in. Check email or password"
});

export const githubLogin = passport.authenticate("github", {
    successFlash: "Welcome",
    failureFlash: "can't login this time."
});

//async (accessToken, refreshToken, profile, cb)
export const githubLoginCallback = async (_, __, profile, cb) => {
    const {
        _json: { id, avatar_url: avatarUrl, name, email }
    } = profile;    

    try{
        const user = await User.findOne({ email });
        if(user){
            user.githubId = id;
            user.save();
            return cb(null, user);
        } 
        
        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avatarUrl
        });        
        return cb(null, newUser);

    }catch(error){
        return cb(error)
    };
}

export const postGithubLogIn = (req, res) => {
    res.redirect(routes.home);
}


export const logout = (req, res) => {
    req.flash('info', "Logged out. see you later");
    req.logout();
    res.redirect(routes.home)
}

export const getMe = (req, res) => {
    res.render("userDetail", {pageTitle:'userDetail', user : req.user});
}

export const getEditProfile = (req, res) => {
    res.render("editProfile", {pageTitle:'editProfile'})
}

export const postEditProfile = async (req, res) => {
    const{
        body: {name, email},
        file
    } = req;

    try{
        const user = await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file ? file.location : req.user.avatarUrl
        });
        req.flash('success', "profile updated");
        res.redirect(routes.me)
    }catch(error){
        //res.render("editProfile", {pageTitle: "Edit Profile"});
        req.flash('error', "can't update");
        res.redirect(routes.editProfile);
    }
}


export const getChangePassword = (req, res) => {
    res.render("changePassword", { pageTitle: "Change Password" });
}

export const postChangePassword = async (req, res) => {
    const {
        body: { oldPassword, newPassword, newPassword1 }
    } = req;

    try{
        if (newPassword !== newPassword1){
            req.flash('error', "Passwords don't match");
            res.status(400);
            res.redirect(`/users/${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    }catch(error){
        req.flash('error', "Can't change password");
        res.status(400);
        res.redirect(`/users/${routes.changePassword}`);
    }

}


export const userDetail = async (req, res) => {
    const { params : {id} } = req;
    try{
        const user = await (await User.findById(id)).populate('videos');
        res.render("userDetail", {pageTitle:'userDetail', user});
    } catch (error){
        req.flash("error", "User not found");
        res.redirect(routes.home);
    }
}
