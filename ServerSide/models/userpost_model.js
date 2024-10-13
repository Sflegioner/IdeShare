import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserPost = new Shema({
    user_author:ObjectId,
    title: String,
    reaction:{
        likes:Number,
        dislikes:Number,
        wow_reactions:Number,
    },
    views:Number,
})
