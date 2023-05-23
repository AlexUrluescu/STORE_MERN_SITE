import mongoose from "mongoose";

const form1Schema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    label1:{
        type: String,
        required: true,
        trim: true
    },
    label2:{
        type: String,
        required: true,
        trim: true
    },
    label3:{
        type: String,
        required: true,
        trim: true
    },
    label4:{
        type: String,
        required: true,
        trim: true
    },

    label5:{
        type: String,
        required: true,
        trim: true
    },

    label6:{
        type: String,
        required: true,
        trim: true
    },

    user_name:{
        type: String,
        required: true,
        trim: true
    },
})

export default mongoose.model('FirstForm', form1Schema);