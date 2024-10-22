if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodoverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");

const ATLAS_URL=process.env.ATLAS_URL;
const session=require ("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


main().then(()=>{
    console.log("connected to db");
}).catch((err) => {
    console.log(err)
}
);
async function main() {
  await mongoose.connect(ATLAS_URL);
}
const store=MongoStore.create({
    mongoUrl:ATLAS_URL,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600,
});
store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
});
const sessionOptions={
    store,
    secret:process.env.SECRET,
    saveUninitialized:true,
    resave:false,
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
};
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use("/listings",listing);
app.use("/listings/:id/reviews/:reviewId",reviews);
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    
    next();
})
app.get("/demousers",async(req,res)=>{
    let fakeUser=new User({
        email:"student123@gmail.com",
        username:"delta-student"
    });
   let registeredUser=await User.register(fakeUsers,"helloworld");
   res.send(registeredUser);
})

const listing=require("./router/listing.js");
const reviews=require("./router/reviews.js");
const user=require("./routes/user.js");

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
})
app.use((err,req,res,next)=>{
    //let {status=500,message="something went wrong"}=err;
    res.status(statusCode).render(error.ejs,{err});
});
app.listen(8080,()=>{
    console.log("listening on port 8080")
});