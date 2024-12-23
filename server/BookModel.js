import mongoose from "mongoose";


const bookSchema = mongoose.Schema({
    Book_Title :{
        type:String,
        required:true
    },
    Author :{
        type:String,
        required:true
    },
    Rating:{
        type:Number,
        required:true
    },
    Review_Text:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
})

export const  BookReview = mongoose.model('BookReview',bookSchema)
export default BookReview
