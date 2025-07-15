import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import {app} from "./app.js"
import ImageKit from "imagekit";
dotenv.config()



connectDB()
    .then(() => {
        const server = app.listen(process.env.PORT || 8000, () => {
            console.log(`server is running at ${process.env.PORT}`);
        });
        server.on("error", (error) => {
            console.log("SERVER ERROR : ", error);
        });
    })
    .catch((err) => {
        console.log("MONGODB CONNECTION FAILED : ", err);
    });
