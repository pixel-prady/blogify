import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addBlog, getAllBlogs, getBlogById,deleteBlogById,togglePublish,addComment,getBlogComments,generateContent} from "../controllers/blog.controller.js";
import  auth  from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/all").get(getAllBlogs)
router.route("/:blogId").get(getBlogById)
router.route("/add-comment").post( addComment);
router.route("/comments").post( getBlogComments);

//secuted  routes 
router.route("/addBlog").post(upload.single("image"),auth, addBlog);
router.route("/delete").post(auth, deleteBlogById);
router.route("/toggle-publish").post( auth, togglePublish);
router.route("/generate").post(auth,generateContent)

export default router;
