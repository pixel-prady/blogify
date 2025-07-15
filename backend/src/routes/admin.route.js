import express from "express";
import auth  from "../middleware/auth.middleware.js";
import { getAllComments,getAllBlogsOfUser,getDashboard,deleteCommentById,approveCommentById } from "../controllers/admin.controller.js";

const adminRouter = express.Router();

// secured routes 
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsOfUser);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);
adminRouter.get("/dashboard", auth, getDashboard);

export default adminRouter;
