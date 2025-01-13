import mongoose from "mongoose";

const userPhotoSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    image_name: {type: String,required: true},
    image_path: {type: String,required: true},
    image_info: {
        uploaded_date: {type: Date,required: true,default: Date.now },
        uploaded_time: {type: String,  required: true}}
    });

const UserPhoto = mongoose.model('UserPhoto', userPhotoSchema);
export default UserPhoto;
