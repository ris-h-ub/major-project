const express=("express");
const router=express.Router();
const User=require("../models/user.js");
const passport=require("passport");
const wrapAsync=require("../utils/ExpressError.js");
const {saveRedirectUrl}=require ("../middleware.js");
const userController=require("../controller/user.js");


router.route("/signup")
.get("/signup",userController.renderNewUser)
.post("/signup",wrapAsync(userController.userSignin));

router.route("/login")
.get("/login",userController.renderLogin)
.post("/login",saveRedirectUrl,passport.authenticate("local",{
    failureRedirect:"/login",
    failureflash:true,
}),userController.userLogin);



router.get("/logout",userController.userLogout);


module.exports=router;