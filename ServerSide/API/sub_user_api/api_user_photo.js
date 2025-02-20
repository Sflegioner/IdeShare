import express, { json } from "express";
import UserPhoto from "../../models/user_photo_model.js";
import { error } from "console";
import fs from 'node:fs';
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const user_router = express.Router();
//TODO:MOVE TO CONFIG
const path_of_save_folder = "../../user_files/ServerSide/user_files/user_avatars";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadFolder = path.resolve(__dirname, "../../user_files/ServerSide/user_files/user_avatars");
        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true });
        }
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
const upload = multer({ storage });

//Show Image
user_router.get("/user_photo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const photo = await UserPhoto.findOne({ user_id: id });
        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }

        const filePath = path.resolve(photo.image_path);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "Image file not found" });
        }
        res.sendFile(filePath);
    } catch (error) {
        console.error("Error fetching user photo:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

user_router.post("/user_photo", upload.single("image"), async (req, res) => {
    try {
        const { id } = req.body;
        const file = req.file;

        if (!id || !file) {
            return res.status(400).json({ message: "Invalid data" });
        }

        const newPhoto = new UserPhoto({
            user_id: id,
            image_name: file.originalname,
            image_path: file.path,
            image_info: {
                uploaded_date: new Date(),
                uploaded_time: new Date().toLocaleTimeString(),
            },
        });

        await newPhoto.save();
        const image_url = path.join("/uploads", path.basename(file.path));
        res.status(201).json({ message: "Profile image was saved!", image_url });
    } catch (error) {
        console.error("Error saving user photo:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

user_router.put("/user", async (req, res) => {
    try {
        const { id, username, useremail } = req.body;

        if (!id || !username || !useremail) {
            return res.status(400).json({ message: "Invalid data" });
        }

        const updatedUser = await UserPhoto.findOneAndUpdate(
            { user_id: id },
            { $set: { username, useremail } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully!", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default user_router;