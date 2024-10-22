const mongoose=require("mongoose");
const schema=mongoose.Schema;

const reviewSchema= new Schema({
    comment:String,
    reting:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:Schema.Type.ObjectId,
        ref:"User",
    },
});
module.exports=mongoose.model("Review",reviewSchema);