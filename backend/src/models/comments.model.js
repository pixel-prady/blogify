import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        blog: {
            type: Schema.Types.ObjectId,
            ref: "Blog",
        },
        isApproved: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

export const  Comments = mongoose.model("Comments", commentSchema);
