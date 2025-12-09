import mongoose from "mongoose";

const refIdSchema = new mongoose.Schema({
  ref_id: { type: String, required: true, unique: true },
  is_open: { type: Boolean, default: true },
  rfs_query: { type: String }
});

const RefId = mongoose.model("RefId", refIdSchema);

export default RefId;
