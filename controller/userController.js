import passport from "passport";
import routes from "../routes"
import User from "../models/User"
import userRouter from "../routers/userRouter";

export const getJoin = (req, res) => {
    res.render("join", {pageTitle:'join'});
}

export const postJoin = async (req, res, next) =>{
    const{
        body: {name, email, password, password2}
    } = req;

    if(password !== password2){
        res.status(400);
        res.render("join", {pageTitle: 'Join'})
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
            console.log(error.name);
            res.redirect(routes.home);
        }        
    }
    res.render("join", {pageTitle:'join'});
}

export const getlogin = (req, res) => 
    res.render("login", {pageTitle:'login'});

    
export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
});


export const logout = (req, res) => {
    res.redirect(routes.home)
}
export const editProfile = (req, res) => 
    res.render("editProfile", {pageTitle:'editProfile'})
export const changePassword = (req, res) => 
    res.render("changePassword", {pageTitle:'changePassword'})
export const userDetail = (req, res) => 
    res.render("userDetail", {pageTitle:'userDetail'})

