const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const listingController=require("../controllers/listings.js");
const {storage}=require("../clousConfig.js");
const upload=multer({storage});

const {isLoggedIn,isOwner,validatelisting}=require("../middleware.js");

const validatelisting=(req,res,next)=>{
    let {error}=listingschema.validate(req.body);
    if(error){
        let errmsg=err.details.map((el)=>{el.message}).join(",");
        throw new ExpressError(400,{errmsg});
    }else{
        next();
    }
    };

router.route("/")
.get(wrapAsync(listingController.index))
// .post(upload.single("listing[]"))
.post(isLoggedIn,validateListing,upload.single("listing[image]"),wrapAsync(listingController.createListing)
)
//create route-get
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get("/:id",isLoggedIn,isOwner,wrapAsync(listingController.showListings))
.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"),validatelisting,wrapAsync(listingController.updateListings))
.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListings));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListings));


module.exports=router;