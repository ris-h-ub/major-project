const express=("express");
const router=express.Router({mergeParams:true});

const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const listing=require("../router/listing.js");
const Review=require("../models/review.js");
const reviewController=require("../router/review.js");
const {validatereview,isLoggedIn,isReviewAuthor}=require("../middleware.js");
//review post route
router.post("/",isLoggedIn,validatereview,wrapAsync(reviewController.createReview));
//review delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));
module.exports=router;