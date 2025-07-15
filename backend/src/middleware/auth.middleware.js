import { apierror } from "../utils/apiError.js";
import { asynchandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT = asynchandler(async (req, _, next) => {
    try {
        const authHeader = req.header("Authorization") || "";
        const token = req.cookies?.accessToken || authHeader.split(" ")[1];

        if (!token) {
            throw new apierror(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            throw new apierror(401, "INVALID ACCESS TOKEN");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new apierror(401, error?.message || "INVALID ACCESS TOKEN");
    }
});


export default verifyJWT ; 