import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes declaration:

import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.route.js";
import adminRouter from "./routes/admin.route.js"

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/admin",adminRouter) ; 


// Central error handler 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
});


export { app };
