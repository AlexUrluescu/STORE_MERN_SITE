import Post from "../models/Post.js";
import User from "../models/User.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = "hhiauisuqnqmbwqoiiqiz0zmslak-127817";

export const getPosts = async (req, res) => {
    try {    
        const posts = await Post.find()
        res.send(posts)
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message})
    }

};

export const createPost = async (req, res) => {

    try {
        const {product_name, details, quantity, price, user_name} = req.body;
        
        if(user_name === 'undefined undefined'){
            return res.json({status: "error"})
        }
     
        const newPost = new Post({product_name, details, quantity, price, user_name})
    
        console.log(newPost);
        await newPost.save()
        return res.json({status: "ok"});

    } catch (error) {
        return res.status(500).json({message: error.message})
        
    }
};

export const updatePost = async (req, res) => {

    try {
        const updatedPost = await Form1.findByIdAndUpdate(req.params.id, req.body, { new: true })
        console.log(updatedPost);
        return res.json(updatedPost);

    } catch (error) {
        return res.status(500).json({message: error.message})
        
    }
};   

export const deletePost = async (req, res) => {
    try {
        const postRemoved = await Form1.findByIdAndDelete(req.params.id);

        if(!postRemoved) return res.sendStatus(404)

        if(postRemoved.public_id){
            await deleteImage(postRemoved.public_id)
        }
    
        return res.status(200).json({message: "Deleted"})

    } catch (error) {
        return res.status(500).json({message: error.message})
        
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) return res.sendStatus(404);
    
        return res.json(post);
        
    } catch (error) {
        return res.status(500).json({message: error.message})
        
    }

};

// -----------------------------------------------------------------

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
        
    } catch (error) {
        console.log(error);
    }
}

export const registerUser = async (req, res) => {
    const {first_name, last_name, age, city, email, password} = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        const oldUser = await User.findOne({email})
        console.log(oldUser);

        if(oldUser){
            return res.json({error: "user already exist"});
        }

        const newUser = new User({first_name, last_name, age, city, email, password: encryptedPassword})
    
        console.log(newUser);
        await newUser.save()
        return res.json(newUser)
        
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.json({error: "user not found"});
    }

    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({email: user.email}, JWT_SECRET);

        if(res.status(201)){
            return res.json({status: "ok", data: token});

        } else{
            return res.json({error: "error"});
        }
    }

    res.json({error: "Password incorrect"})

}

export const userData = async (req, res) => {
    const { token } = req.body;

    try {
        const user = jwt.verify(token, JWT_SECRET);
        const user_email = user.email;

        User.findOne({email: user_email})
            .then((data) => {
                res.send({status: "ok", data: data})
            })
            .catch((error) => {
                res.send({status: "error", data: error})
            })

        
    } catch (error) {
        console.log(error);
    }

}
