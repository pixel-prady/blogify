import ImageKit from "imagekit";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadOnImageKit = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const fileBuffer = fs.readFileSync(localFilePath);
        const fileName = localFilePath.split("/").pop();

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: fileName,
            folder: "/blogs",
        });

        // optimized URL
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: "auto" },
                { format: "webp" },
                { width: "1280" },
            ],
        });

        // console.log("FILE IS UPLOADED ON IMAGEKIT", response.fileId);
        // console.log("OPTIMIZED IMAGE URL:", optimizedImageUrl);

        fs.unlinkSync(localFilePath);

        return {
            fileId: response.fileId,
            optimizedImageUrl,
        };
    } catch (error) {
        console.error("IMAGEKIT UPLOAD ERROR:", error.message);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};

const deleteFromImageKit = async (fileId) => {
    try {
        if (!fileId) return null;

        const response = await imagekit.deleteFile(fileId);
        console.log("IMAGEKIT FILE DELETED:", response);
        return response;
    } catch (error) {
        console.error("IMAGEKIT DELETE ERROR:", error.message);
        throw error;
    }
};

export { uploadOnImageKit, deleteFromImageKit };
