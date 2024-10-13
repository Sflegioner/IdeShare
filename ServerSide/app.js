import mongoose from 'mongoose';
import express from 'express';
import User from './models/user_model.js';

const app = express();
const mongodb = mongoose;

mongodb.connect('mongodb://localhost:27017/IdeShare')
.then(() => {
    console.log('db connected');
}).catch((e) => {
    console.e('db connection error:', error);
});

app.listen(1488, () => {
    console.log('SERVER START');
});

//if database not exist => create

await function createShemasForDB(){
    User.save().then(()=>{console.log("User created successfully")}).catch((e)=>{console.log(e)});
}

export default app;
