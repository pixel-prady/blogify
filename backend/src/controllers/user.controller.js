import { asynchandler } from "../utils/asyncHandler.js";
import { apiresponse } from "../utils/apiResponse.js";
import { apierror } from "../utils/apiError.js";
import { User } from "../models/user.model.js";

// Helper: Generate access & refresh token
const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new apierror(404, "USER NOT FOUND WHILE GENERATING TOKENS");
        }

        const accessToken = user?.generateAccessToken();
        const refreshToken = user?.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new apierror(
            500,
            "SOMETHING WENT WRONG WHILE GENERATING ACCESS AND REFRESH TOKENS"
        );
    }
};

// Register Controller
const register = asynchandler(async (req, res) => {
    const name = req?.body?.name?.trim();
    const email = req?.body?.email?.trim();
    const password = req?.body?.password?.trim();

    if (!name || !email || !password) {
        throw new apierror(400, "ALL FIELDS ARE REQUIRED");
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new apierror(409, "USER WITH EMAIL ALREADY EXISTS");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    const createdUser = await User.findById(user?._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new apierror(500, "FAILED TO REGISTER USER");
    }

    return res
        .status(201)
        .json(
            new apiresponse(201, createdUser, "USER REGISTERED SUCCESSFULLY")
        );
});

// Login Controller
const login = asynchandler(async (req, res) => {
    const identifier = req?.body?.identifier?.trim();
    const password = req?.body?.password?.trim();

    if (!identifier || !password) {
        throw new apierror(400, "EMAIL AND PASSWORD ARE REQUIRED");
    }

    const user = await User.findOne({ email: identifier });

    if (!user) {
        throw new apierror(404, "USER DOES NOT EXIST");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new apierror(401, "PASSWORD INCORRECT");
    }

    const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(user?._id);

    const loggedInUser = await User.findById(user?._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiresponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "USER LOGGED IN SUCCESSFULLY"
            )
        );
});

//logout controller
const logout = asynchandler(async (req, res) => {
    const userId = req?.user?._id;

    if (!userId) {
        throw new apierror(401, "UNAUTHORIZED: USER NOT LOGGED IN");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new apierror(404, "USER NOT FOUND");
    }

    user.refreshToken = undefined;
    await user.save({ validateBeforeSave: false });

    return res
        .clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        })
        .clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        })
        .status(200)
        .json(new apiresponse(200, {}, "USER LOGGED OUT SUCCESSFULLY"));
});

export { register, login, logout };
