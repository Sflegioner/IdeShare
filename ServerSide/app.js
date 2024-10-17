import mongoose from 'mongoose';
import express from 'express';
import User from './models/user_model.js';
import router from './API/api_user_interactions.js';

const app = express();
app.use(express.json());//middleware to use json
const mongodb = mongoose;
const PORT = 4444;

mongodb.connect('mongodb://localhost:27017/IdeShare')
    .then(() => {
        console.log('db connected');
    })
    .catch((error) => {
        console.error('db connection error:', error);
    });

app.use("/API", router);

app.listen(PORT, () => {
    console.log('SERVER START');
});  

function createShemasForDB() {
    const newUser = new User({
    });

    newUser.save()
        .then(() => {
            console.log("User created successfully");
        })
        .catch((e) => {
            console.log(e);
        });
}

process.on('SIGINT', function () {
    server.close(() => {
        console.log(chalk.blue('Shutting down server'));
        process.exit();
    });
});
export default app;
