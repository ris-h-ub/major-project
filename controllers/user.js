const User=require("../models/user.js");

module.exports.renderUserForm=(req,res)=>{
    res.render("/Users/signup.ejs");
};

module.exports.userSignin=async(req,res)=>{
    try{
       let{username,email,password}=req.body;
       const newUser=new User({email,username});
       const registeredUser=await User.register(newUser,password);
       console.log(registeredUser);
       req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to wanderlust");
        res.redirect("/listings");
       });
      
    }catch(e){
        req.flash("error","e.message");
        res.redirect("/signup");
    }
};

module.exports.renderLogin=(req,res)=>{
    res.render("/Users/login.ejs");
};

module.exports.userLogin=async (req,res)=>{
    req.flash("success","welcome back to wanderlust");
    let redirectUrl=req.localsredirectUrl || "/listings";
    res.redirect(redirectUrl);
 };

 module.exports.userLogout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are successfully log out");
        res.redirect("/listings");
        });
};