import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        subTitle: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: [true, "Image is required"],
        },
        imageFileId: {
            type: String,
            required: [true, "FileId is required"],
        },
        category: {
            type: String,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        isPublished: {
            type: Boolean,
            default: false, 
        },
    },
    { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
