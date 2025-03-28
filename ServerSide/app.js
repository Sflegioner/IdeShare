import mongoose from "mongoose";
import express from "express";
import User from "./models/user_model.js";
import cors from "cors";
import user_router from "./API/api_user_interactions.js";
import post_router from "./API/api_post_interactions.js";
import application_router from "./API/api_application_interactions.js";
import search_user_route from "./API/api_serch_engine.js";
import api_user_photo from "./API/sub_user_api/api_user_photo.js"


const app = express();
app.use(express.json()); //middleware to use json
const mongodb = mongoose;
const PORT = 4444;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

mongodb
  .connect("mongodb://127.0.0.1:27017/IdeShare")
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.error("db connection error:", error);
  });

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use("/API", user_router);
app.use("/API", post_router);
app.use("/API", application_router);
app.use("/API", search_user_route);
app.use("/API_USER/", api_user_photo);


app.listen(PORT, () => {
  console.log("SERVER START");
});

function createShemasForDB() {
  const newUser = new User({});

  newUser
    .save()
    .then(() => {
      console.log("User created successfully");
    })
    .catch((e) => {
      console.log(e);
    });
}

process.on("SIGINT", function () {
  server.close(() => {
    console.log(chalk.blue("Shutting down server"));
    process.exit();
  });
});
export default app;
