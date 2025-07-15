import { uploadOnImageKit, deleteFromImageKit } from "../utils/imageKit.js";
import { asynchandler } from "../utils/asyncHandler.js";
import { apiresponse } from "../utils/apiResponse.js";
import { apierror } from "../utils/apiError.js";
import { Blog } from "../models/blog.model.js";
import { Comments } from "../models/comments.model.js";
import main from "../gemini/gemini.js"

export const addBlog = asynchandler(async (req, res) => {
    const blogData = JSON.parse(req?.body?.blog || "{}");
    const { title, subTitle, description, category, isPublished } = blogData;
    const imageFile = req?.file;

    if (!title || !description || !category || !imageFile) {
        throw new apierror(400, "ALL REQUIRED FIELDS MUST BE PROVIDED");
    }

    const response = await uploadOnImageKit(imageFile?.path);

    if (!response) {
        throw new apierror(500, "IMAGE UPLOAD FAILED");
    }

    const blog = await Blog.create({
        title,
        subTitle,
        description,
        category,
        image: response?.optimizedImageUrl,
        imageFileId: response?.fileId,
        isPublished,
        owner: req.user._id, // 👈 Add this line to associate the blog with the logged-in user
    });

    return res
        .status(201)
        .json(new apiresponse(201, blog, "BLOG ADDED SUCCESSFULLY"));
});

export const getAllBlogs = asynchandler(async (req, res) => {
    const blogs = await Blog.find({ isPublished: true });
    return res
        .status(200)
        .json(new apiresponse(200, blogs, "ALL BLOGS FETCHED"));
});

export const getBlogById = asynchandler(async (req, res) => {
    const blogId = req?.params?.blogId;

    const blog = await Blog.findById(blogId).populate({
        path: "owner",
        select: "-password -refreshToken -createdAt -updatedAt",
    });

    if (!blog) throw new apierror(404, "BLOG NOT FOUND");

    return res.status(200).json(new apiresponse(200, blog, "BLOG FOUND"));
});

export const deleteBlogById = asynchandler(async (req, res) => {
    const id = req?.body?.id;

    const blog = await Blog.findById(id);
    if (!blog) throw new apierror(404, "BLOG NOT FOUND");

    if (blog?.imageFileId) {
        try {
            await deleteFromImageKit(blog.imageFileId);
        } catch (error) {
            console.error("Failed to delete image from ImageKit:", error);
        }
    }

    await Blog.findByIdAndDelete(id);

    await Comments.deleteMany({ blog: id }); // fixed: was mistakenly `Comment`

    return res
        .status(200)
        .json(new apiresponse(200, {}, "BLOG DELETED SUCCESSFULLY"));
});

export const togglePublish = asynchandler(async (req, res) => {
    const id = req?.body?.id;

    const blog = await Blog.findById(id);
    if (!blog) throw new apierror(404, "BLOG NOT FOUND");

    blog.isPublished = !blog.isPublished;
    await blog.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new apiresponse(200, blog, "BLOG PUBLISH STATUS TOGGLED"));
});

export const addComment = asynchandler(async (req, res) => {
    const { blog, name, comment } = req?.body || {};


    if (!blog || !name || !comment) {
        throw new apierror(400, "ALL FIELDS ARE REQUIRED");
    }

    const newComment = await Comments.create({
        blog,
        name,
        comment,
        isApproved: false,
    });

    return res
        .status(201)
        .json(new apiresponse(201, newComment, "COMMENT ADDED FOR REVIEW"));
});

export const getBlogComments = asynchandler(async (req, res) => {
    const blogId = req?.body?.blogId;

    const comments = await Comments.find({
        blog: blogId,
        isApproved: true,
    }).sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new apiresponse(200, comments, "COMMENTS FETCHED SUCCESSFULLY"));
});

export const generateContent = asynchandler(async (req, res) => {
    const { prompt } = req.body;

    const content = await main(
  `${prompt}. Please write a detailed, engaging blog post on this topic in simple, easy-to-understand language. Include key points, examples, and a clear structure suitable for readers new to the subject.`
);

    return res
        .status(200)
        .json(new apiresponse(200, content, "BLOG CONTENT GENERATED"));
});
