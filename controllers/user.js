const User = require("../models/user.js")

module.exports.renderSignUpForm = (req, res) => {
    res.render("user/signup.ejs")
}

module.exports.signUp = (async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
              return next(err);
            }
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listing");
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
})

module.exports.renderLoginForm =  (req, res) => {
    res.render("user/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success","Welcome back to Wanderlust!!");
    let redirectUrl = res.locals.redirectUrl || "/listing"
    res.redirect(redirectUrl);
 }

 module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","Logout Successfully!");
        res.redirect("/listing");
    })
}