import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({// _id provide by default
    username: { type: String, required: true },
    useremail: { type: String, required: true, unique: true },
    userpass: { type: String, required: true },
    usertelephone:{type:String,require:true},
    dataofcreation:{}
});

// Create a Model from the Schema
const User = mongoose.model('User', userSchema);

export default User;