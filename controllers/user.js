const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res)=>{
    res.render("users/signup.ejs");
};

module.exports.Signup = async(req, res, next)=>{
    try{
        let {username, email, password} = req.body;
        let newUser = new User({username, email});
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err)=>{
            if(err){
                next(err);
            }
            req.flash("success", "Welcome to WanderLust!");
            res.redirect("/listings");
        });
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    };
};

module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req, res) => {
    req.flash("success", "Welcome back to WanderLust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are successfully logged out");
        res.redirect("/listings");
    });
};