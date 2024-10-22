const listing=require("/models/listing.js");
const Review=require("./models/review.js");
const {listingschema,reviewSchema}=require("./schema.js");
const ExpressError=require("./utils/ExpressError.js");
module.exports.isLoggedIn=(req,res,next)=> {
    if(!req.authenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flsh("error","you must be logged in to create listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
  let {id}=req.params;
  let listing=await listing.findById(id);
  if(! listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error","You are not the owner");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validatelisting=(req,res,next)=>{
    let {error}=listingschema.validate(req.body);
    if(error){
        let errmsg=err.details.map((el)=>{el.message}).join(",");
        throw new ExpressError(400,{errmsg});
    }else{
        next();
    }
    };

module.exports.validatereview=(req,res,next)=>{
        let {error}=reviewSchema.validate(req.body);
        if(error){
            let errmsg=err.details.map((el)=>{el.message}).join(",");
            throw new ExpressError(400,{errmsg});
        }else{
            next();
        }
        };   
       
module.exports.isReviewAuthor=async(req,res,next)=>{
            let {Id,reviewid}=req.params;
            let review=await listing.findById(id);
            if(! review.author.equals(res.locals.currUser._id)){
              req.flash("error","You are not the author");
              return res.redirect(`/listings/${id}`);
            }
            next();
          };        