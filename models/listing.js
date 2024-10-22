const mongoose=require("mongoose");
const schema=mongoose.Schema;
const Review=require("./review.js");

const listingschema= new schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String
        // type:String,
        // default:"https://unsplash.com/photos/a-large-clock-tower-towering-over-a-city-X22l9waE_FU?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
        // set:(v)=>v==" "?"https://unsplash.com/photos/a-large-clock-tower-towering-over-a-city-X22l9waE_FU?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash":v,
    },
    price:Number,
    location:String,
    country:String,
    review:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:
        {
          type:Schema.Types.ObjectId,
          ref:"User",
        },
});
listingschema.post("findOneAndDelete",async (readlistings)=>{
    if(readlistings){
        await Review.deleteMany({_id:{$in:readlistings.reviews}});

    }
});
const Listing=mongoose.model("Listing",listingschema);
module.exports=Listing;