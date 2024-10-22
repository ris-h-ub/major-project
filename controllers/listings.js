const Listing=require("../models/listing.js");

module.exports.index=async(req,res)=>{
    const alllistings=await Listing.find({});
    res.render("index.ejs",{alllistings});
}

module.exports.renderNewForm=(req,res)=>{
    res.render("new.ejs");
};

module.exports.showListings=async (req,res)=>{
    let {id}=req.params;
    const readlistings=await Listing.findById(id).populate({path:"reviews",
     populate:{
        path:"author",
     },   
    }).populate("owner");
    if(!readlistings){
        req.flash("error","Listing you requested for doesnot exist");
        res.redirect("/listings");
    }
    res.render("show.ejs",{readlistings});
};

module.exports.createListings=async(req,res)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    const newlistings=new Listing(req.body.listing);
    newlistings.owner=req.user._id;
    newlistings.image={url,filename};
    await newlistings.save();
    req.flash("success","New listing Created!");
    res.redirect("/listings");
    // const newlistings=new Listing(req.body.listing);
    // await newlistings.save();
    // res.redirect("/listings");
};

module.exports.editListings=async(req,res)=>{
    let{id}=req.params;
    const listingss=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing does not exist");
        res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.updateListings=async(req,res)=>{
    // if(!req.body.listing){
    //     throw new ExpressError(500,"something went wrong");
    // }
    let {id}=req.params;
    let updation=await Listing.findByIdAndUpdate(id,{...req.body});
   if(typeof req.file!="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    updation.image={url,filename};
    await updation.save();
   }
    // if(!updation){
    //     req.flash("error","Listing you requested for doesnot exist");
    //     res.redirect("/listings");
    // }
    req.flash("success","Listing updated");
    res.redirect("/listings");
};

module.exports.destroyListings=async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
};