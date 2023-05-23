import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    subject:{
        type: String,
        required: true,
        trim: true
    },
    details:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: String,
        required: true,
        trim: true
    },
    user_name:{
        type: String,
        required: true,
        trim: true
    }
})

export default mongoose.model('Post', postSchema);