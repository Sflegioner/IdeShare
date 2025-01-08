import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const applicationSchema = new mongoose.Schema({
  post_id: { type: ObjectId, required: true },
  applier_id: { type: ObjectId, required: true },
  role:{type:String},
  motivation: { type: String, required: true },
});
const Application = mongoose.model("Application", applicationSchema);

export default Application;
