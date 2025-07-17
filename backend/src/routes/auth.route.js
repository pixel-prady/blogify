import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { apierror } from "../utils/apiError.js";
import { asynchandler } from "../utils/asyncHandler.js";


const router = express.Router();

router.get(
    "/refresh",
    asynchandler(async (req, res) => {
        const refreshToken = req.cookies?.refreshToken;
        
        // console.log("🔁 Refresh token route hit", refreshToken);

        if (!refreshToken) {
            throw new apierror(401, "Refresh token missing login !!");
        }

        const user = await User.findOne({ refreshToken });
        if (!user) {
            throw new apierror(403, "Invalid refresh token please Login !!");
        }

        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        } catch (err) {
            throw new apierror(403, "Refresh token expired Login !!");
        }

        const newAccessToken = user.generateAccessToken();

        return res.status(200).json({
            success: true,
            accessToken: newAccessToken,
        });
    })
);

export default router