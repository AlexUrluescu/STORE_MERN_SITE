import { Router } from "express"
import { getPosts, createPost, updatePost, deletePost, getPost, registerUser, getUsers, loginUser, userData, postForm1, getForms, getFormSelect } from "../controllers/post.controllers.js";

const router = Router()

router.get('/posts', getPosts)

router.post('/posts', createPost)

router.put('/posts/:id', updatePost)

router.delete('/posts/:id', deletePost)

router.get('/posts/:id', getPost)

// ----------------------------------------------------

router.get("/register", getUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post("/userData", userData)


// ---------------------------------------------------
router.post("/form1", postForm1)
router.get("/forms", getForms)
router.get("/forms/:id", getFormSelect)

export default router