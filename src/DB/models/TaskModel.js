import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    description: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assigned: { type: Schema.Types.ObjectId, default: null },
    finishBy: { type: Date, default: null },
    index: Number,
  },
  { timestamps: true }
);

export const TaskModel =
  mongoose.models.Task || mongoose.model("Task", TaskSchema);
