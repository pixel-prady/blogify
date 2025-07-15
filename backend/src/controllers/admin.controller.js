import { asynchandler } from "../utils/asyncHandler.js";
import { apiresponse } from "../utils/apiResponse.js";
import { apierror } from "../utils/apiError.js";
import { Blog } from "../models/blog.model.js";
import { Comments } from "../models/comments.model.js";

// ✅ Get all blogs of the currently logged-in user
export const getAllBlogsOfUser = asynchandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new apierror(401, "UNAUTHORIZED: USER NOT LOGGED IN");
    }

    const blogs = await Blog.find({ owner: userId }).sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new apiresponse(200, blogs, "ALL USER BLOGS FETCHED"));
});


export const getAllComments = asynchandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new apierror(401, "UNAUTHORIZED: USER NOT LOGGED IN");
    }

    // Step 1: Get all blog IDs created by this user
    const userBlogs = await Blog.find({ owner: userId }).select("_id");

    const blogIds = userBlogs.map(blog => blog._id);

    // Step 2: Find comments where blog is one of those blog IDs
    const comments = await Comments.find({ blog: { $in: blogIds } })
        .populate({
            path: "blog",
            select: "title category isPublished"
        })
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new apiresponse(200, comments, "ALL COMMENTS ON USER BLOGS FETCHED")
    );
});


export const getDashboard = asynchandler(async (req, res) => {
    const userId = req.user._id;

    const recentBlogs = await Blog.find({ owner: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title createdAt isPublished");

    const blogs = await Blog.countDocuments({ owner: userId });
    const drafts = await Blog.countDocuments({ owner: userId, isPublished: false });

    // Fetch blog IDs to get only those comments
    const userBlogs = await Blog.find({ owner: userId }).select("_id");
    const blogIds = userBlogs.map(blog => blog._id);
    const comments = await Comments.countDocuments({ blog: { $in: blogIds } });

    const dashboardData = {
        blogs,
        comments,
        drafts,
        recentBlogs,
    };

    return res
        .status(200)
        .json(new apiresponse(200, dashboardData, "DASHBOARD DATA FETCHED"));
});


// ✅ Delete comment
export const deleteCommentById = asynchandler(async (req, res) => {
    const commentId = req?.body?.id;

    if (!commentId) {
        throw new apierror(400, "COMMENT ID IS REQUIRED");
    }

    const comment = await Comments.findById(commentId).populate('blog');

    if (!comment) {
        throw new apierror(404, "COMMENT NOT FOUND");
    }

    // Check ownership
    if (comment.blog.owner.toString() !== req.user._id.toString()) {
        throw new apierror(403, "FORBIDDEN: You can delete only your blog's comments");
    }

    await Comments.findByIdAndDelete(commentId);

    return res
        .status(200)
        .json(new apiresponse(200, {}, "COMMENT DELETED SUCCESSFULLY"));
});


// ✅ Approve comment
export const approveCommentById = asynchandler(async (req, res) => {
    const commentId = req?.body?.id;

    if (!commentId) {
        throw new apierror(400, "COMMENT ID IS REQUIRED");
    }

    const comment = await Comments.findById(commentId).populate('blog');

    if (!comment) {
        throw new apierror(404, "COMMENT NOT FOUND");
    }

    // Check ownership
    if (comment.blog.owner.toString() !== req.user._id.toString()) {
        throw new apierror(403, "FORBIDDEN: You can approve only your blog's comments");
    }

    comment.isApproved = true;
    await comment.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new apiresponse(200, comment, "COMMENT APPROVED SUCCESSFULLY"));
});
